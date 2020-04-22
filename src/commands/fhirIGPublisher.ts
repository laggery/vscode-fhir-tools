import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';

// https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation

const runIGPublisher = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.runIGPublisher', () => {
        downloadIGPublisher(context).then(resp => {
            const terminal = vscode.window.createTerminal(`IGPublisher`);
            terminal.show(true);
            terminal.sendText(`java -jar ${path.join(context.extensionPath, 'org.hl7.fhir.publisher.jar')} -ig ig.ini`);
        });
    });
};

const downloadIGPublisher = (context: vscode.ExtensionContext): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path.join(context.extensionPath, 'org.hl7.fhir.publisher.jar'))) {
            resolve(true);
            return;
        }

        vscode.window.showInformationMessage('The first time the IGPublisher must be downloaded. It may take a while!');

        try {
            const file = fs.createWriteStream(path.join(context.extensionPath, 'org.hl7.fhir.publisher.jar'));
            const request = https.get("https://fhir.github.io/latest-ig-publisher/org.hl7.fhir.publisher.jar", function (response) {
                response.pipe(file)
                .on('finish', () => {
                    vscode.window.showInformationMessage('FHIR IGPublisher: org.hl7.fhir.publisher.jar downloaded successful!');
                    resolve(true);
                })
                .on('error', (error) => {
                    vscode.window.showErrorMessage('FHIR IGPublisher: org.hl7.fhir.publisher.jar could not be downloaded!');
                    reject(false);
                });
                
            });
        } catch (exception) {
            reject(false);
        }

    });
};

export {
    runIGPublisher
};