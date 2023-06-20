#!/usr/bin/env node
const {mdLinks}= require('./index.js');
const  chalk = require('chalk');

const archivePath = process.argv[2];
const validateLink = process.argv.includes('--validate');

mdLinks(archivePath, validateLink)
.then((links) => {
  links.forEach(link => {
    if(validateLink){
      if (link.ok === 'ok') {
        console.log(chalk.green(link.status), chalk.green(link.ok), link.text, link.url, link.pathlink);
      } else if (link.ok === 'fail') {
        console.log( chalk.red(link.status), chalk.red(link.ok), link.text, link.url, link.pathlink);
      }
    } else {
      console.log(link.text, link.url, link.pathlink);
    }
  });
});