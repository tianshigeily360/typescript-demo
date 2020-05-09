// 通过这种工厂模式对class做扩展，使其支持语法提示
function testDecorator1() {
  return function<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "jm";
      getName() {
        return this.name;
      }
    };
  };
}

const Test1 = testDecorator1()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const test1 = new Test1("jm");
console.log(test1.name);
console.log(test1.getName());
