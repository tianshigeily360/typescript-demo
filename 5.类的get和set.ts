// getter & setter
class Person4 {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}
const person4 = new Person4("jm");
console.log(person4.name);
person4.name = "jm hhh";
console.log(person4.name);

// 单例设计模式
// 多次实例化对象，都为同一个对象
// static 生成静态属性，挂载在类上，不在实例对象中
class Person5 {
  private static instance: Person5;
  private constructor(private _name: string) {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new Person5("jm");
    }
    return this.instance;
  }
}
const person5 = Person5.getInstance;
const hh = Person5.getInstance;
console.log(person5 === hh); // true
