#!/usr/bin/env node
const {mdLinks}= require('./index.js');
const  chalk = require('chalk');

const archivePath = process.argv[2];
const validateLink = process.argv.includes('--validate');

mdLinks(archivePath, validateLink)
.then((links) => {
  links.forEach(link => {
    if(validateLink){
      console.log(chalk.blue(link.text), link.url, link.pathlink, link.status, link.ok);
    } else {
      console.log(link.text, link.url, link.pathlink);
    }
  });
});

