// 为当前组件声明需要关联依赖的命名空间
/// <reference path="./components.ts" />

namespace Home {
  export class Page {
    user: Component.User = {
      name: "jm"
    };
    constructor() {
      new Component.Header();
      new Component.Content();
      new Component.Footer();
      const test = new Component.SubComponent.Test();
      console.log(test);
      console.log(this.user);
    }
  }
}
