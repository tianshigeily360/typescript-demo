// 原型，方法名，参数索引
function paramsDecorator(target: any, method: string, index: number) {
  console.log(target);
  console.log(method);
  console.log(index);
}

class Test5 {
  getInfo(@paramsDecorator name: string, age: number) {
    console.log(name);
    console.log(age);
  }
}

const test5 = new Test5();
test5.getInfo("jm", 18);
