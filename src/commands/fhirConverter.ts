import * as vscode from 'vscode';
import * as fhirLib from 'fhir';
import { existsSync } from 'fs';
import format from 'xml-formatter';


const xmlToJsonCmd = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.xmlToJson', () => {
        return convertXmlToJson(false);
    });
};

const xmlToJsonCmdNewFile = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.xmlToJsonNewFile', () => {
        return convertXmlToJson(true);
    });
};

const convertXmlToJson = (newFile: boolean) => {
    let textEditor = vscode.window.activeTextEditor;
    if (!textEditor) {
        return;
    }

    if (textEditor.document.languageId !== "xml") {
        vscode.window.showErrorMessage('Current tab is not an XML file');
        return;
    }

    let fhir = new (<any>fhirLib).Fhir();
    let json = fhir.xmlToJson(textEditor.document.getText());
    writeFileContent(textEditor.document, json, 'json', newFile);
}

const jsonToXmlCmd = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.jsonToXml', () => {
        return convertJsonToXml(false);
    });
};

const jsonToXmlCmdNewFile = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('extension.jsonToXmlNewFile', () => {
        return convertJsonToXml(true);
    });
};

const convertJsonToXml = (newFile: boolean) => {
    let textEditor = vscode.window.activeTextEditor;
    if (!textEditor) {
        return;
    }

    if (textEditor.document.languageId !== "json") {
        vscode.window.showErrorMessage('Current tab is not a json file');
        return;
    }

    let fhir = new (<any>fhirLib).Fhir();
    let xml = fhir.jsonToXml(textEditor.document.getText());
    xml = format(xml)
    writeFileContent(textEditor.document, xml, 'xml', newFile);
}

const writeFileContent = async(document: vscode.TextDocument, content: string, extension: string, newFile: boolean) => {
    const newFileUri = vscode.Uri.file(`${document.uri.path.substring(0, document.uri.path.length - document.languageId.length)}${extension}`);
    const fileExist = existsSync(newFileUri.fsPath);
    if (fileExist) {
        const answer = await vscode.window.showInformationMessage("File already exists. Do you want to override it?", "Yes", "No")
        if (!answer || answer === "No") {
            return;
        }
    }

    if (!newFile) {
        const we = new vscode.WorkspaceEdit();
        we.renameFile(document.uri, newFileUri);
        await vscode.workspace.applyEdit(we);
    }

    const writeData = Buffer.from(content, 'utf8');
    await vscode.workspace.fs.writeFile(newFileUri, writeData);
    vscode.window.showTextDocument(newFileUri);
    vscode.window.showInformationMessage('Convert success!');
}

export {
    xmlToJsonCmd,
    xmlToJsonCmdNewFile,
    jsonToXmlCmd,
    jsonToXmlCmdNewFile
};