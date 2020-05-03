interface Point {
  x: number;
  y: number;
}

function demo(params: Point) {
  console.log("123");
  return Math.sqrt(params.x ** 2 + params.y ** 2);
}

demo({ x: 3, y: 4 });
console.log(demo({ x: 3, y: 4 }));

// 基础类型
const student: {
  name: String;
  age: number;
} = {
  name: "jm",
  age: 23
};

class Person {}
const person2: Person = new Person();

const getName: () => String = () => {
  return "jm";
};
