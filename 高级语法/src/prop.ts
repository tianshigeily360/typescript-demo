function nameDecorator(target: any, key: string): any {
  console.log(target);
  console.log(key);
  // const descriptor: PropertyDescriptor = {
  //   writable: false
  // };
  // return descriptor;

  // 装饰器中的属性放在原型上，因为 target 是构造函数的原型
  target[key] = "hhhhhh";
}

// 类中的属性定义在实例化对象上
class Test4 {
  @nameDecorator
  name = "jm";
}

const test4 = new Test4();
console.log(test4.name);
console.log((test4 as any).__proto__.name);
