import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as ig from './fhirIGPublisher';
import * as val from './fhirValidator';

let terminal: vscode.Terminal;

// https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation

const runUpdateJavaTooling = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.runUpdateJavaTooling', () => {

        deleteJar(context, 'publisher.jar').then(resp => ig.downloadIGPublisher(context)).then(resp => {
            if (!terminal) {
                terminal = vscode.window.createTerminal(`Update Jar`);
            }
            terminal.show(true);
            terminal.sendText(`java -jar "${path.join(context.extensionPath, 'publisher.jar')}" --version`);
        }).then(
            resp => deleteJar(context, 'validator_cli.jar').then(resp2 => val.downloadJar(context)).then(resp3 => {
                terminal.show(true);
                terminal.sendText(`java -jar "${path.join(context.extensionPath, 'validator_cli.jar')}"`);
            }));
    });
};

const deleteJar = (context: vscode.ExtensionContext, file: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path.join(context.extensionPath, file))) {
            fs.unlink(path.join(context.extensionPath, file), function (err) {
                if (err) {
                    reject(false);
                }
            });
            resolve(true);
        }
        resolve(true);
    });
};

export {
    runUpdateJavaTooling
};