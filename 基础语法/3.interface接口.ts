interface Person {
  // readonly name: string;
  name: string;
  age?: number;
  [propName: string]: any;
  say(): string;
}

interface kid extends Person {
  play(): string;
}

interface SayHi {
  (word: string): string;
}
const say: SayHi = (word: string) => {
  return word;
};

type Person1 = {
  name: string;
};
type name = string;

const getPersonName = (person: kid) => {
  console.log(person.name);
};

const setPersonName = (person: Person, name: string) => {
  person.name = name;
};

const person = {
  name: "jm",
  sex: 18,
  say() {
    return `hello ${this.name}`;
  },
  play() {
    return "play";
  }
};
const res = person.say();
console.log(res);

getPersonName(person);
setPersonName(person, "kid");

// 为 class 声明类型注解
class User3 implements Person {
  name: "jm";
  say() {
    return "hello";
  }
}
