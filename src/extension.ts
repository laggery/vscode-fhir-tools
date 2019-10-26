import * as vscode from 'vscode';
import { xmlToJsonCmd, jsonToXmlCmd } from './commands/fhirConverter';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(xmlToJsonCmd(context));
	context.subscriptions.push(jsonToXmlCmd(context));
}

// this method is called when your extension is deactivated
export function deactivate() {}
