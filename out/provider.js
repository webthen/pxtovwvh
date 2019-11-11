"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: your name
 * @Date: 2019-11-11 16:15:38
 * @LastEditTime: 2019-11-11 16:29:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pxtovwvh\src\provider.ts
 */
const vscode = require("vscode");
class Provider {
    constructor(process) {
        this.process = process;
    }
    provideCompletionItems(document, position, token) {
        return new Promise((resolve, reject) => {
            const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position));
            const res = this.process.convert(lineText);
            if (!res) {
                return resolve([]);
            }
            const itemVW = new vscode.CompletionItem(`${res.pxValue}px -> ${res.vw}`, vscode.CompletionItemKind.Snippet);
            const itemVH = new vscode.CompletionItem(`${res.pxValue}px -> ${res.vh}`, vscode.CompletionItemKind.Snippet);
            itemVW.insertText = res.vw;
            itemVH.insertText = res.vh;
            return resolve([itemVW, itemVH]);
        });
    }
}
exports.default = Provider;
//# sourceMappingURL=provider.js.map