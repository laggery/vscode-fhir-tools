import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import { constants } from '../constants';

let terminal: vscode.Terminal;

// https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation

const runIGPublisher = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.runIGPublisher', () => {
        downloadIGPublisher(context).then(resp => {
            if (!terminal) {
                terminal = vscode.window.createTerminal(`IGPublisher`);
            }
            terminal.show(true);
            terminal.sendText(`java -jar "${path.join(context.extensionPath, 'publisher.jar')}" -ig ig.ini`);
        });
    });
};

const downloadIGPublisher = (context: vscode.ExtensionContext): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path.join(context.extensionPath, 'publisher.jar'))) {
            resolve(true);
            return;
        }

        vscode.window.showInformationMessage('The first time the IGPublisher must be downloaded. It may take a while!');

        try {
            const file = fs.createWriteStream(path.join(context.extensionPath, 'publisher.jar'));
            https.get(constants.downloadPublisherJarUrl, function (response) {
                if ((response.statusCode = 302) && (response.headers.location !== undefined)) {
                    var redirectUrl: string = response.headers.location;
                    https.get(redirectUrl, function (response2) {
                        if ((response2.statusCode = 302) && (response2.headers.location !== undefined)) {
                            var redirectUrl2: string = response2.headers.location;
                            https.get(redirectUrl2, function (response3) {
                                response3.pipe(file)
                                    .on('finish', () => {
                                        vscode.window.showInformationMessage('FHIR IGPublisher: publisher.jar downloaded successful!');
                                        resolve(true);
                                    })
                                    .on('error', (error) => {
                                        vscode.window.showErrorMessage('FHIR IGPublisher: publisher.jar could not be downloaded!');
                                        reject(false);
                                    });
                            });
                        } else {
                            vscode.window.showErrorMessage('FHIR IGPublisher: Expected 2nd redirect!' + response.statusCode);
                            reject(false);
                        }});
                } else {
                    vscode.window.showErrorMessage('FHIR IGPublisher: Expected redirect!' + response.statusCode);
                    reject(false);
                }
            });
        } catch (exception) {
            reject(false);
        }

    });
};

export {
    runIGPublisher, downloadIGPublisher
};