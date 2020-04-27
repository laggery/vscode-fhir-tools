import * as vscode from 'vscode';
import { xmlToJsonCmd, jsonToXmlCmd } from './commands/fhirConverter';
import { validateResource, validateResourceWithParams } from './commands/fhirValidator';
import { runIGPublisher } from './commands/fhirIGPublisher';
import { runUpdateJavaTooling } from './commands/fhirUpdateJavaTooling';
import { fhirpathWebview } from './commands/fhirpath';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(xmlToJsonCmd(context));
	context.subscriptions.push(jsonToXmlCmd(context));
	context.subscriptions.push(validateResource(context));
	context.subscriptions.push(validateResourceWithParams(context));
	context.subscriptions.push(runIGPublisher(context));
	context.subscriptions.push(runUpdateJavaTooling(context));
	context.subscriptions.push(fhirpathWebview(context));
}

// this method is called when your extension is deactivated
export function deactivate() {}
