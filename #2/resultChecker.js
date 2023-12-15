const fs = require("fs");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

function main() {
  const argv = yargs(hideBin(process.argv)).argv;
  if (argv !== undefined) {
    let resultGamesFile = argv._[0] + ".json";
    if (fs.existsSync(resultGamesFile)) {
      let gamesData;
      try {
        gamesData = JSON.parse(fs.readFileSync(resultGamesFile));
        console.log(
          `Общее кол-во партий: ${
            gamesData.gamesCount
          }\nКол-во выигранных/проигранных партий: ${
            gamesData.gamesWon
          }\nПроцентное соотношение выигранных партий: ${
            (gamesData.gamesWon / gamesData.gamesCount) * 100
          }`
        );
      } catch (error) {
        console.log("Файл не содержит данных об игровых результатах");
      }
    } else {
      console.log("Файл отсутсвует!");
    }
  } else {
    console.log("Не указано имя файла!");
    return;
  }
}

if (require.main === module) {
  main();
}
