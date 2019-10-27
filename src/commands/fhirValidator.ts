import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';

const validateResource = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.validateResource', () => {
        let textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            if (textEditor.document.languageId !== "json" && textEditor.document.languageId !== "xml") {
                vscode.window.showErrorMessage('Current tab is not a json or an xml file');
                return;
            }
            downloadJar(context).then(resp => {
                const terminal = vscode.window.createTerminal(`Resource validation`);
                terminal.show(true);
                terminal.sendText(`java -jar ${path.join(context.extensionPath, 'org.hl7.fhir.validator.jar')} ${textEditor!.document.uri.fsPath} -version 4.0.0`);
            });
        }
    });
};

const downloadJar = (context: vscode.ExtensionContext): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path.join(context.extensionPath, 'org.hl7.fhir.validator.jar'))) {
            resolve(true);
            return;
        }

        vscode.window.showInformationMessage('The first time the jar validator must be downloaded. It may take a while!');

        try {
            const file = fs.createWriteStream(path.join(context.extensionPath, 'org.hl7.fhir.validator.jar'));
            const request = https.get("https://fhir.github.io/latest-ig-publisher/org.hl7.fhir.validator.jar", function (response) {
                response.pipe(file)
                .on('finish', () => {
                    console.log(`The file is finished downloading.`);
                    resolve(true);
                })
                .on('error', (error) => {
                    reject(false);
                });
                
            });
        } catch (exception) {
            reject(false);
        }

    });
};

export {
    validateResource
};