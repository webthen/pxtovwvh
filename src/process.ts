/*
 * @Author: your name
 * @Date: 2019-11-11 16:13:01
 * @LastEditTime: 2019-11-11 16:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pxtovwvh\src\process.ts
 */
export default class Process {
  constructor(private config: any) { }
  private regPx: RegExp = /([-]?[\d.]+)p(x)?/;
  private regPxAll: RegExp = /([-]?[\d.]+)px/g;

  convert(text: string) {
      let match = text.match(this.regPx)
      if (!match) return '';
      return this.px2vwvh(match[1]);
  }

  convertAll(text: string): string {
      if (!text) return text;
      return text.replace(this.regPxAll, (word: string) => {
          const res = this.px2vwvh(word);
          if (res) return res.vw;
          return word;
      });
  }

  private px2vwvh(text: string) {
      const pxValue = parseFloat(text);
      let vw: string = +(pxValue / this.config.width * 100).toFixed(this.config.toFixedNum) + 'vw';
      let vh: string = +(pxValue / this.config.height * 100).toFixed(this.config.toFixedNum) + 'vh';
      return {
          px: text,
          pxValue: pxValue,
          vw: vw,
          vh: vh
      }
  }
}