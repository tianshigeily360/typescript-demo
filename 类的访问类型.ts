// public 允许在类内部及外部调用
// protected 允许在类的内部及继承的子类中调用
// private 只允许在类的内部调用
// 没有定义访问类型则默认为 public

class Person2 {
  protected name: string;
  public sayHi() {
    this.name;
    console.log("hi");
  }
}
class Kids extends Person2 {
  sayBye() {
    this.name;
  }
}
const person1 = new Person2();
// person1.name = "jm";
// console.log(person1.name);
person1.sayHi();

// constructor

// Ts写法内部变量赋值
class Person3 {
  // 传统写法
  // public name: string;
  // constructor(name: string) {
  //   this.name = name;
  // }
  // Ts简化写法
  constructor(public name: string) {}
}
// 通过 new 实例化构造函数的过程中会直接调用 构造函数的 constructor
const person3 = new Person3("jm");
console.log(person3.name);

// 子类中调用构造器，必须通过 super 函数调用下父类的构造函数
class Kids1 extends Person3 {
  constructor(public age: number) {
    super("jm");
  }
}
const kids = new Kids1(8);
console.log(kids.age);
console.log(kids.name);
