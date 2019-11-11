"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: your name
 * @Date: 2019-11-11 16:13:01
 * @LastEditTime: 2019-11-11 16:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pxtovwvh\src\process.ts
 */
class Process {
    constructor(config) {
        this.config = config;
        this.regPx = /([-]?[\d.]+)p(x)?/;
        this.regPxAll = /([-]?[\d.]+)px/g;
    }
    convert(text) {
        let match = text.match(this.regPx);
        if (!match)
            return '';
        return this.px2vwvh(match[1]);
    }
    convertAll(text) {
        if (!text)
            return text;
        return text.replace(this.regPxAll, (word) => {
            const res = this.px2vwvh(word);
            if (res)
                return res.vw;
            return word;
        });
    }
    px2vwvh(text) {
        const pxValue = parseFloat(text);
        let vw = +(pxValue / this.config.width * 100).toFixed(this.config.toFixedNum) + 'vw';
        let vh = +(pxValue / this.config.height * 100).toFixed(this.config.toFixedNum) + 'vh';
        return {
            px: text,
            pxValue: pxValue,
            vw: vw,
            vh: vh
        };
    }
}
exports.default = Process;
//# sourceMappingURL=process.js.map