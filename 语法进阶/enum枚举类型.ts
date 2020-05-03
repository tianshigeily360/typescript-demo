enum Status {
  OFFLINE, // 默认从 0 开始，如果有赋值，则从赋值开始往下加
  ONLINE = 4, // 0,4,5
  DELETED
}

// const Status = {
//   OFFLINE: 0,
//   ONLINE: 0,
//   DELETED: 0
// };

function getResult(status) {
  if (status === Status.OFFLINE) {
    return "OFFLINE";
  } else if (status === Status.ONLINE) {
    return "ONLINE";
  } else if (status === Status.DELETED) {
    return "DELETED";
  }
  return "ERROR";
}

const res = getResult(1);
console.log(res); // "ONLINE"
