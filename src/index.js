const fs = require("fs");
const Table = require("cli-table3");

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) reject(err);
      
      const regex = /\[(.*?)\]\((.*?)\)/g;
      const matches = data.match(regex);
      if (matches) {
        const links = matches.map((match) => {
          const [_, text, url] = /\[(.*?)\]\((.*?)\)/.exec(match);
          return { text, url };
        });
        resolve(links);
      } else {
        resolve([]);
      }
    });
  });
}

mdLinks("./files/file.md")
  .then((links) => {
    if (links.length === 0) {
      console.log("Nenhum link encontrado.");
    } else {
      const table = new Table({
        head: ["Texto", "URL"],
        colWidths: [30, 70],
      });

      links.forEach((link) => {
        table.push([link.text, link.url]);
      });

      console.log(table.toString());
    }
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = {};
