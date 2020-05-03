namespace Component {
  // 可以在命名空间中定义 接口类型
  export interface User {
    name: string;
  }
  // 在命名空间中定义 其他命名空间
  export namespace SubComponent {
    export class Test {
      constructor() {
        return "jm-test";
      }
    }
  }

  export class Header {
    constructor() {
      const ele = document.createElement("div");
      ele.innerText = "This is header";
      document.body.appendChild(ele);
    }
  }

  export class Content {
    constructor() {
      const ele = document.createElement("div");
      ele.innerText = "This is Content";
      document.body.appendChild(ele);
    }
  }

  export class Footer {
    constructor() {
      const ele = document.createElement("div");
      ele.innerText = "This is Footer";
      document.body.appendChild(ele);
    }
  }
}
