#!/usr/bin/env node

// import { createFuncName, createTypeName } from "./utils";

const chalk = require("chalk");

// const { Command } = require("commander"); // add this line
const figlet = require("figlet");
// const fs = require("fs");
// const path = require("path");
//add the following line
// const program = new Command();

console.log(figlet.textSync("Handle Type"));
const { default: dtsgenerator, parseSchema } = require("dtsgenerator");
const ncp = require("copy-paste");

// program
//   .version("1.0.0")
//   .description("Check Chinese Tool")
//   .option("-u, --url  [value]", "translate api")
//   .option("-i, --ignore  [value]", "ignore folder")
//   .option("-h, --help", "output usage information")
//   .parse(process.argv);

async function main() {
  const text = ncp.paste();
  let openAPI;
  try {
    openAPI = JSON.parse(text);
  } catch (error) {
    console.log(chalk.red("请复制符合OpenAPI结构数据！！！"));
    return;
  }
  dtsgenerator({
    contents: [parseSchema(openAPI)],
    config: {
      /* Config object */
    },
  })
    .then((content: string) => {
      /* Do someting with parsed content */
      console.log(chalk.green(content));
    })
    .catch((err: any) => {
      console.log(chalk.red(err));
      /* Handle errors */
    });
}
main();
