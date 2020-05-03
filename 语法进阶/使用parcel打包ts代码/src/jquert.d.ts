// 定义 .d.ts 文件，帮助 ts 识别 js库

// 通过 declare 定义全局变量
// var 定义变量

// 使用变量的方式
// declare var $: (params: () => void) => void;

// 定义全局函数
interface JqueryInstance {
  text: (params: string) => JqueryInstance;
  html: (params: string) => JqueryInstance;
}
// 函数重载
declare function $(readyFunc: () => void): void;
declare function $(selector: string): JqueryInstance;

// 借用 interface 实现函数的重载
// interface JQuery {
//   (readyFunc: () => void): void;
//   (selector: string): JqueryInstance;
// }
// declare var $: JQuery;

// 定义全局对象用 namespace
declare namespace $ {
  namespace fn { class init {} }
}
