// 以 ES6 模块为例，为模块写类型描述文件
// 这样就可以在 ts 中使用模块做导入导出
declare module "jquery" {
  interface JqueryInstance {
    text: (params: string) => JqueryInstance;
    html: (params: string) => JqueryInstance;
  }
  function $(readyFunc: () => void): void;
  function $(selector: string): JqueryInstance;
  namespace $ {
    namespace fn { class init {} }
  }
  export = $;
}
