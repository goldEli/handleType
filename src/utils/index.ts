function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function decapitalizeWord(word: string) {
  return word.replace(/^./, function (char) {
    return char.toLowerCase();
  });
}

export const createFuncName = (url: string) => {
  let res = createTypeName(url);
  return decapitalizeWord(res);
};

export const createTypeName = (url: string) => {
  const arr = url
    .split("/")
    .filter((item) => !!item)
    .slice(1);
  let res = "";
  arr.forEach((word) => {
    res += capitalizeWord(word);
  });
  return res;
};
