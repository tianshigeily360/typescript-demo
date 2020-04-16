// 类型注解和类型推断
// Ts 能自动分析推断出变量类型的，我们就不需要主动做类型注解
const num = 1;
function getTotal(firstNumber: number, secondNumber: number): number {
  return firstNumber + secondNumber;
}

const total = getTotal(1, 2);

// 返回值为空
function sayHello(): void {
  console.log(123);
}
// 函数永远不会执行完毕
function errorEmitter(): never {
  while (true) {}
}

// 解构参数
function add({ first, second }: { first: number; second: number }): number {
  return first + second;
}
add({ first: 1, second: 2 });
