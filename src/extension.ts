import * as vscode from 'vscode';
import { xmlToJsonCmd, jsonToXmlCmd } from './commands/fhirConverter';
import { validateResource } from './commands/fhirValidator';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(xmlToJsonCmd(context));
	context.subscriptions.push(jsonToXmlCmd(context));
	context.subscriptions.push(validateResource(context));
}

// this method is called when your extension is deactivated
export function deactivate() {}
