const fs = require("fs");

function validar(links) {
  links.forEach((link) => { 
    fetch(link.url)
    .then((response) => console.log(link.text, response.status))
    .catch((error) => console.log(link.text, error.message))
  })
}

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      if (error) {
        reject(new error ('Nenhum link encontrado' + error));
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
        validar(links);
      }
      resolve(links);
    };
  });
});
}

module.exports = { mdLinks };
