const http = require("http");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { stdin: input, stdout: output } = require("node:process");

function main() {
  const apiKey = process.env.API_KEY;
  const city = yargs(hideBin(process.argv)).argv._[0];
  const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  http.get(apiUrl, (response) => {
    const { statusCode } = response;
    let data = "";

    if (statusCode !== 200) {
      console.log("statusCode :>> ", statusCode);
      return { data: data, statusCode: statusCode };
    }

    response.setEncoding("utf8");

    response
      .on("data", (chunk) => {
        data += chunk;
      })
      .on("end", () => {
        let { current } = JSON.parse(data);
        if (current === undefined) {
          console.log("Некорректное название города!");
          return;
        }
        console.log(
          `Температура: ${current.temperature}\nСкорость ветра: ${current.wind_speed}\nДавление: ${current.pressure}`
        );
      })
      .on("error", (error) => {
        console.log("error :>> ", error);
      });
    return { data: data, statusCode: statusCode };
  });
}

if (require.main === module) {
  main();
}
