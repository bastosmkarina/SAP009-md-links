const {mdLinks}= require('./index.js');
// const { chalk }= require('chalk');

const archivePath = process.argv[2];
console.log(process.argv)
const validateLink = process.argv.includes('--validate');
console.log(validateLink)

mdLinks(archivePath, validateLink)
.then((links) => {
  links.forEach(link => {
    if(validateLink){
      console.log(link.text, link.url, link.pathlink, link.status, link.ok);
    } else {
      console.log(link.text, link.url, link.pathlink);
    }
  });
});

