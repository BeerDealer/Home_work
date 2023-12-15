const fs = require("fs");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

function main() {
  let resultFile;
  const argv = yargs(hideBin(process.argv)).argv;
  resultFile = argv._[0];

  if (resultFile === undefined) {
    console.log("Отсутсвует переданное имя файла!");
    return;
  } else {
    resultFile += ".json";
    let gameData;
    if (fs.existsSync(resultFile)) {
      try {
        gameData = JSON.parse(fs.readFileSync(resultFile));
      } catch (err) {}
    }
    if (gameData === undefined) {
      gameData = { gamesCount: 0, gamesWon: 0, lastGameResult: "" };
    }
    console.log("gameData :>> ", gameData);

    const writeStram = fs.createWriteStream(resultFile);
    const read = readline.createInterface({ input, output });

    const secret = Math.floor(Math.random() * 2) + 1;

    console.log("Угадай \nОрёл - 1\nРешка - 2");

    read.on("line", (input) => {
      if (parseInt(input) == secret) {
        console.log("Угадали!");
        gameData.lastGameResult = "win";
        gameData.gamesWon += 1;
      } else {
        console.log("Проиграли!!");
        gameData.lastGameResult = "lose";
      }
      gameData.gamesCount += 1;
      writeStram.write(JSON.stringify(gameData), (err) => {
        if (err) {
          console.log("err :>> ", err);
          throw Error(err);
        }
      });
      read.close();
    });
  }
}

if (require.main === module) {
  main();
}
