
//  т.к. все setTimeout-ы уходять в web API с callStack-а, то первым выполниться по порядку a,b,c - после 1,2,3 переходят в очеред задач.
console.log('a');
setTimeout(() => {
  console.log(1);
}, 0);

console.log('b');
setTimeout(() => {
  console.log(2);
}, 0);

console.log('c');
setTimeout(() => {
  console.log(3);
}, 0);