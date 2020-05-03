interface Person {
  name: string;
  age: number;
  gender: string;
}

class Kids {
  constructor(private info: Person) {}
  /*
    通过 extends 为 T 定义类型约束
    keyof 等于遍历了 接口Person 的每一个属性
    所以这里相当于为 泛型T定义了具体的类型约束
    ex: type="name" || type="age" || type="gender"
  */
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const kid = new Kids({
  name: "jm",
  age: 18,
  gender: "male"
});
const k_name = kid.getInfo("name");
