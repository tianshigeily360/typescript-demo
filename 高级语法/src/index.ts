// 类的装饰器本事是一个函数
// 装饰器接受的参数是构造函数
// 装饰器调用通过 @ 符号
// 装饰器调用时间是在类创建之时，不是实例化的时候

// 使用工厂模式创建装饰器，可以通过传参形式达到选择性调用装饰器的目的
function testDecorator(flag: Boolean) {
  if (flag) {
    return function(constructor: any) {
      constructor.prototype.getName = () => {
        console.log("jm");
      };
    };
  } else {
    return function(constructor: any) {};
  }
}

@testDecorator(true)
class Test {}
const test = new Test();
(test as any).getName();
