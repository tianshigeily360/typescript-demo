// 基础类型： Boolean，Number，String，Void，Undefined，Symbol，Null
let count: Number;
count = 123;

// 对象类型：{}, Class, function, []
const arr: number[] = [1, 2, 3];
const func = (str: string) => {
  return parseInt(str, 10);
};
const date = new Date();

interface SPerson {
  name: string;
}
const rowData = JSON.stringify({ name: "123" });
console.log(rowData);
const newData: SPerson = JSON.parse(rowData);
console.log(newData);
console.log(newData.name);
