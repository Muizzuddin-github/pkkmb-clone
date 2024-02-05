function checkLengthAlamat(text) {
  let result = "";

  let incre = 70;
  for (let i = 0; i < text.length; i++) {
    if (i < incre) {
      result += text[i];
    } else {
      result += "\n" + " ".repeat(11) + text[i];
      incre += 70;
    }
  }

  return result;
}

export default checkLengthAlamat;
