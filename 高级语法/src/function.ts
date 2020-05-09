// 方法的装饰器
// 普通方法，target 对应类的 prototype
// 静态方法，target 对应类的构造函数
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor // {value: [Function],writable: true,enumerable: true,configurable: true}
) {
  console.log(target);
  console.log(key);
  console.log(descriptor);
  // 可以通过 descriptor 对方法进行一些修改
  // 使 getName 方法为不可修改的
  descriptor.writable = false;
  descriptor.value = () => {
    return "hhhhh";
  };
}

class Test2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test2 = new Test2("jjjjjjmmmmmm");
// 重写 getName 的返回值
// test2.getName = () => {
//   return "123";
// };
console.log(test2.getName());
