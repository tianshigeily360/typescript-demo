// 函数泛型，generic 指泛指的类型
// 在函数调用时指定参数类型，可以指定多个泛型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`;
}
join<string, string>("1", "1");
join(1, "1"); // 如果调用时没有指定泛型，ts底层会根据类型推断 推断出泛型

// 根据泛型，做数组的类型注解
// Array<T>
function map<T>(params: T[]) {
  return params;
}
map<string>(["123"]);
