// 访问器装饰器
function setNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // descriptor.writable = false; // 不能同时指定访问器的值和可选属性
}

class Test3 {
  _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @setNameDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test3 = new Test3("jm");
console.log(test3.name);
