import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { evaluate } from 'fhirpath';
import * as fhirLib from 'fhir';

let content: string = '';

const fhirpathWebview = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.fhirpathWebview', () => {
        let textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            if (textEditor.document.languageId !== "json" && textEditor.document.languageId !== "xml") {
                vscode.window.showErrorMessage('Current tab is not a json or an xml file');
                return;
            }

            let panel: vscode.WebviewPanel;
            vscode.window.onDidChangeVisibleTextEditors(e => {
                if (panel) {
                    panel.dispose();
                }
            });

            panel = vscode.window.createWebviewPanel(
                'Fhirpath',
                'Fhirpath',
                vscode.ViewColumn.Beside,
                {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
                }
            );

            const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'media', 'web', 'fhirpath', 'index.html'));
            panel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');
            if (textEditor.document.languageId === "json") {
                content = JSON.parse(textEditor.document.getText());
            } else {
                let fhir = new (<any>fhirLib).Fhir();
                content = fhir.xmlToObj(textEditor.document.getText());
            }        
            sendMessage(panel, JSON.stringify(content, undefined, 2));
            receiveMessage(panel, context);
        }
    });
};

const sendMessage = (panel: vscode.WebviewPanel, content: string) => {
    panel.webview.postMessage({ command: 'result', value: content });
};

const receiveMessage = (panel: vscode.WebviewPanel, context: vscode.ExtensionContext) => {
    panel.webview.onDidReceiveMessage(
        message => {
            if (message.value === "") {
                sendMessage(panel, JSON.stringify(content, undefined, 2));
            } else {
                try {
                    const result = evaluate(content, message.value, null);
                    sendMessage(panel, JSON.stringify(result, undefined, 2));
                } catch (exception) {
                    sendMessage(panel, "[]");
                }
            }
        },
        undefined,
        context.subscriptions
    );
};

export {
    fhirpathWebview
};