const fs = require("fs");
const modulovalidar = require("./validar");

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      if (error) {
        reject(new Error ('Nenhum link encontrado' + error));
        return;
      } else {
      const regex = /\[(.*?)\]\((.*?)\)/g;
      const links = [];
      let match;
      while ((match = regex.exec(data)) !== null) {
        const text = match[1];
        const url = match[2];
        const pathlink = path
         links.push({ text, url, pathlink});  
      } 
      if(options) {
        modulovalidar.validar(links, resolve);
      } else {
        resolve(links);
      }
    };
  });
});
}

module.exports = { mdLinks };
