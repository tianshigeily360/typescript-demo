// 为泛型定义类型
interface Item {
  name: string;
}
class DataManager<T extends Item> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name;
  }
}
// const data = new DataManager<string | number>(["1", 2]);
// data.getItem(0);
const data = new DataManager([{ name: "jm" }]);

// 可以对泛型有个约束
// 这里给 class 定义类型注解的泛型就只能是 string 或 number 类型
class DataManager1<T extends string | number> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index];
  }
}
const data1 = new DataManager1<string>(["1"]);

// 使用泛型做一个具体的类型注解
const fun: <T>(params: T) => T = <T>(params: T) => {
  return params;
};
