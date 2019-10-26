import * as vscode from 'vscode';
import * as fhirLib from 'fhir';


const xmlToJsonCmd = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.xmlToJson', () => {
        let textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            if (textEditor.document.languageId !== "xml") {
                vscode.window.showErrorMessage('Current tab is not a json file');
                return;
            }
            let fhir = new (<any>fhirLib).Fhir();
            let json = fhir.xmlToJson(textEditor.document.getText());
    
            renameFile(textEditor.document, 'json');
            replaceText(textEditor.document, json);
        }
    
    });
};

const jsonToXmlCmd = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.jsonToXml', () => {
        let textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            if (textEditor.document.languageId !== "json") {
                vscode.window.showErrorMessage('Current tab is not a json file');
                return;
            }
            let fhir = new (<any>fhirLib).Fhir();
            let xml = fhir.jsonToXml(textEditor.document.getText());
    
            renameFile(textEditor.document, 'xml');
            replaceText(textEditor.document, xml);
        }
    });
};

const replaceText = (document: vscode.TextDocument, value: string) => {
    vscode.window.showTextDocument(document, 1, false).then(e => {
        const document = e.document;
        e.edit(edit => {
            edit.replace(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(document.getText().length + 1, 0)), value);
            vscode.window.showInformationMessage('Convert success!');
        });
    });
};

const renameFile = (document: vscode.TextDocument, newExtension: string) => {
    let we = new vscode.WorkspaceEdit();
    const newUri = `${document.uri.path.substring(0, document.uri.path.length - document.languageId.length)}${newExtension}`;
    we.renameFile(document.uri, vscode.Uri.file(newUri));
    vscode.workspace.applyEdit(we);
};

export {
    xmlToJsonCmd,
    jsonToXmlCmd
};