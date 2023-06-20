const fs = require("fs");

function validar(links, resolve) {
  const promessas = links.map((link) => { 
    return fetch(link.url)
    .then((response) => {
      link.status = response.status;
      link.ok = 'ok'
      if(link.status >= 400) {
        link.ok = 'fail'
      }
      return link;
    })
    .catch((erro) => {
      link.status = 'erro'
      link.ok = 'fail'
      return link;
    })
  })
  Promise.all(promessas)
  .then((result) => {
    resolve(result);
  })
}


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
        validar(links, resolve);
      } else {
        resolve(links);
      }
    };
  });
});
}

module.exports = { mdLinks, validar };
