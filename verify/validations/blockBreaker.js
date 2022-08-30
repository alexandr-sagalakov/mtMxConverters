const areBracketsBalanced = (mtString) => {
    let stack = [];
    let array = [];
    for (let i = 0; i < mtString.length; i++) {
      if (mtString[i] == "{" || mtString[i] == "}") {
        if (mtString[i] == "{") {
          stack.push("{ " + i);
        } else {
          let top = stack[stack.length - 1];
          stack.pop();
          if (stack.length === 0) {
            let start = top.slice(2, top.length);
            let startNum = parseInt(start, 10);
            let string = mtString.slice(startNum + 1, i);
            array.push(string);
          }
        }
      }
    }
    return array;
  }

  module.exports = areBracketsBalanced;