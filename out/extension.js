"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const process_1 = require("./process");
const provider_1 = require("./provider");
function activate(context) {
    let config = vscode.workspace.getConfiguration('px2vwvh');
    const Process = new process_1.default(config);
    const Provider = new provider_1.default(Process);
    const LANS = ['html', 'vue', 'css', 'less', 'scss', 'sass', 'stylus'];
    for (let lan of LANS) {
        let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, Provider);
        context.subscriptions.push(providerDisposable);
    }
    let disposable = vscode.commands.registerTextEditorCommand('extension.px2vwvh', function (textEditor, edit) {
        const doc = textEditor.document;
        let selection = textEditor.selection;
        if (selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }
        let text = doc.getText(selection);
        textEditor.edit(builder => {
            builder.replace(selection, Process.convertAll(text));
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map