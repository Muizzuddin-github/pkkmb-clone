function checkLengthAlamat(text) {
  let result = "";

  let line = 0;
  let incre = 70;
  for (let i = 0; i < text.length; i++) {
    if (i < incre) {
      result += text[i];
    } else {
      result += "\n" + " ".repeat(11) + text[i];
      incre += 70;
      line += 20;
    }
  }

  return [line, result];
}

export default checkLengthAlamat;
