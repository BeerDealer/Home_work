#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .command(
    "current",
    "get current date",
    function (yargs) {
      return yargs
        .option("year", {
          alias: "y",
          default: false,
        })
        .option("month", {
          alias: "m",
          default: false,
        })
        .option("date", {
          alias: "d",
          default: false,
        })
        .boolean("year")
        .boolean("month")
        .boolean("date");
    },
    function (argv) {
      const date = new Date();
      let result = argv.year ? String(date.getFullYear()) + " " : "";
      result += argv.month ? String(date.getMonth()) : "";
      result += result ? "" : date.toISOString();
      console.log(result);
    }
  )
  .command(
    "add",
    "add value to current date",
    function (yargs) {
      return yargs
        .option("day", {
          alias: "d",
          type: "number",
          default: 0,
        })
        .option("month", {
          alias: "m",
          type: "number",
          default: 0,
        })
        .option("year", {
          alias: "y",
          type: "numbers",
          default: 0,
        });
    },
    function (argv) {
      let result = new Date();
      result.setFullYear(result.getFullYear() + argv.year);
      result.setDate(result.getDate() + argv.day);
      result.setMonth(result.getMonth() + argv.month);
      console.log(result);
    }
  )
  .command(
    "sub",
    "remove value from current date",
    function (yargs) {
      return yargs
        .option("day", {
          alias: "d",
          type: "number",
          default: 0,
        })
        .option("month", {
          alias: "m",
          type: "number",
          default: 0,
        })
        .option("year", {
          alias: "y",
          type: "numbers",
          default: 0,
        });
    },
    function (argv) {
      let result = new Date();
      result.setFullYear(result.getFullYear() - argv.year);
      result.setDate(result.getDate() - argv.day);
      result.setMonth(result.getMonth() - argv.month);
      console.log(result);
    }
  ).argv;
