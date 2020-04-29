import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as ig from './fhirIGPublisher';
import * as val from './fhirValidator';

let terminal: vscode.Terminal;

// https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation

const runUpdateJavaTooling = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.runUpdateJavaTooling', () => {

        deleteJar(context, 'org.hl7.fhir.publisher.jar').then(resp => ig.downloadIGPublisher(context)).then(resp => {
            if (!terminal) {
                terminal = vscode.window.createTerminal(`Update Jar`);
            }
            terminal.show(true);
            terminal.sendText(`java -jar ${path.join(context.extensionPath, 'org.hl7.fhir.publisher.jar')} --version`);
        }).then(
            resp => deleteJar(context, 'org.hl7.fhir.validator.jar').then(resp => val.downloadJar(context)).then(resp => {
                terminal.show(true);
                terminal.sendText(`java -jar ${path.join(context.extensionPath, 'org.hl7.fhir.validator.jar')}`);
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
}

export {
    runUpdateJavaTooling
};