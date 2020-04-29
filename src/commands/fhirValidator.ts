import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import { constants } from '../constants';

let terminal: vscode.Terminal;

const validateResource = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.validateResource', () => {
        let textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            if (textEditor.document.languageId !== "json" && textEditor.document.languageId !== "xml") {
                vscode.window.showErrorMessage('Current tab is not a json or an xml file');
                return;
            }
            downloadJar(context).then(resp => {
                if (!terminal) {
                    terminal = vscode.window.createTerminal(`Resource validation`);
                }
                terminal.show(true);
                terminal.sendText(`java -jar ${path.join(context.extensionPath, 'org.hl7.fhir.validator.jar')} ${textEditor!.document.uri.fsPath} -version 4.0.1`);
            });
        }
    });
};

const validateResourceWithParams = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.validateResourceWithParams', () => {
        let textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            if (textEditor.document.languageId !== "json" && textEditor.document.languageId !== "xml") {
                vscode.window.showErrorMessage('Current tab is not a json or an xml file');
                return;
            }
            
            downloadJar(context).then(async resp => {
                let optionsInput = await vscode.window.showInputBox({
                    placeHolder: "Enter the JAR options",
                    prompt: "Example: -version 3.0 -ig http://hl7.org/fhir/us/core"
                });

                if (!optionsInput) {
                    optionsInput = "-version 4.0.1";
                }
                if (!terminal) {
                    terminal = vscode.window.createTerminal(`Resource validation`);
                }
                terminal.show(true);
                terminal.sendText(`java -jar ${path.join(context.extensionPath, 'org.hl7.fhir.validator.jar')} ${textEditor!.document.uri.fsPath} ${optionsInput}`);
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
            const request = https.get(`${constants.donwloadJarUrl}/org.hl7.fhir.validator.jar`, function (response) {
                response.pipe(file)
                .on('finish', () => {
                    vscode.window.showInformationMessage('Fhir validator jar downloaded successful!');
                    resolve(true);
                })
                .on('error', (error) => {
                    vscode.window.showErrorMessage('Fhir validator jar could not be downloaded!');
                    reject(false);
                });
                
            });
        } catch (exception) {
            reject(false);
        }

    });
};

export {
    validateResource,
    validateResourceWithParams,
    downloadJar
};