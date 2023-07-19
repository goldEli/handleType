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

async function main() {
  const dir = path.join(process.cwd(), "./handleType.txt");
  const data = (await readFile(dir)) as string;
  let temp = data.split("\n");

  const arr: string[] = [];
  let index = 0;
  while (index < temp.length) {
    arr.push(temp[index]?.trim() + "\t" + temp[index + 1]?.trim());
    index += 2;
  }

  const info = arr
    .map((item) => {
      const [name, comment, method, require, type] = item.split("\t");
      return {
        name,
        comment,
        method,
        require,
        type,
      };
    })
    .filter((item) => !!item.name);

  let str = "";

  for (const item of info) {
    str += `// ${item.comment} \n${item.name}${
      item.require === "false" ? "?:" : ":"
    } ${item.type.includes("integer") ? "number" : item.type}\n`;
  }

  console.log(str);
}
main();
