interface Bird {
  fly: Boolean;
  sing: () => {};
}
interface Dog {
  fly: Boolean;
  bark: () => {};
}
// 联合类型，这里给函数传参传 Bird 或 Dog 类型都可以，解决联合类型的语法报错要用到类型保护
function trainAnimal(animal: Bird | Dog) {
  if (animal.fly) {
    // 这里通过类型断言的方式做类型保护，告诉 ts 参数animal 的类型，就不会对 sing 或 bark 方法报错
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
}
function trainAnimal1(animal: Bird | Dog) {
  if ("sing" in animal) {
    // 这里通过 in 语法的方式做类型保护，告诉 ts 参数animal 的类型，就不会对 sing 或 bark 方法报错
    animal.sing();
  } else {
    animal.bark();
  }
}

// typeof 语法做类型保护
function add1(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}

// 使用 instanceof 语法做类型保护
// 这样在定义类型时，只能使用 class 来定义，因为只有 class 支持 instanceof 语法，interface 不支持
class NumberObj {
  count: number;
}
function add2(first: Object | NumberObj, second: Object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
}
