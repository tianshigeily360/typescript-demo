const undefinedArr: undefined[] = [undefined, undefined, undefined];

interface User {
  name: String;
  age: Number;
}
type User1 = {
  name: String;
  age: Number;
};
class User2 {
  name: String;
  age: Number;
}

const ObjectArr: User1[] = [{ name: "jm", age: 12 }];
const ClassArr: User2[] = [new User2(), { name: "jm", age: 12 }];
console.log(ClassArr);

// 元祖
const arrInfo: [string, string, number] = ["jm", "male", 18];
const arrList: [string, string, number][] = [
  ["jm", "male", 18],
  ["jjmm", "male", 28],
  ["jjjmmm", "male", 38]
];
