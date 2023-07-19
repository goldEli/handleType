#!/usr/bin/env node

const chalk = require("chalk");

const { Command } = require("commander"); // add this line
const figlet = require("figlet");
const fs = require("fs");
const path = require("path");
//add the following line
const program = new Command();

console.log(figlet.textSync("Handle Type"));

// program
//   .version("1.0.0")
//   .description("Check Chinese Tool")
//   .option("-u, --url  [value]", "translate api")
//   .option("-i, --ignore  [value]", "ignore folder")
//   .option("-h, --help", "output usage information")
//   .parse(process.argv);

// const options = program.opts();

// console.log({ options });
function readFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err: any, data: string) => {
      if (err) {
        console.error(err);
        return;
      }
      resolve(data);
    });
  });
}
function hasChinese(str: string) {
  var reg = /[\u4e00-\u9fa5]/; // 使用 Unicode 编码范围匹配中文字符
  return reg.test(str);
}
async function main() {
  const dir = path.join(process.cwd(), "./handleType.txt");
  const data = (await readFile(dir)) as string;
  let temp = data.split("\n");

  const arr: string[] = temp;
//   let index = 0;
//   while (index < temp.length) {
//     arr.push(temp[index]?.trim() + "\t" + temp[index + 1]?.trim());
//     index += 2;
//   }

  const info = arr
    .map((item) => {
      const [name, ...otherWords] = item.split("\t");
      const comment = otherWords.find((item) => hasChinese(item));
      const type = otherWords.find((item) =>
        ["string", "integer", "boolean"].some((i) => item.includes(i))
      );
      const required = otherWords.find((item) =>
        ["false", "true"].some((i) => item.includes(i))
      );
      return {
        name,
        comment,
        required,
        type,
      };
    })
    .filter((item) => !!item.name);

  let str = "";

  for (const item of info) {
    const commentStr = item.comment ? `// ${item.comment}` : ''
    str += `${commentStr} \n${item.name}${
      item.required === "false" ? "?:" : ":"
    } ${item?.type?.includes("integer") ? "number" : item.type}\n`;
  }

  console.log(str);
}
main();
