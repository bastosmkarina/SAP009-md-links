#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const chalk = require('chalk');
const Table = require('cli-table3');

const archivePath = process.argv[2];
const validateLink = process.argv.includes('--validate');

mdLinks(archivePath, validateLink)
  .then((links) => {
    const table = new Table({
      head: [
        chalk.white('Status'),
        chalk.white('Title'),
        chalk.white('URL'),
        chalk.white('Path')
      ],
      colWidths: [10, 30, 50, 50],
    });

    links.forEach((link) => {
      if (validateLink) {
        if (link.ok === 'ok') {
          table.push([
            chalk.green(link.status),
            link.text,
            link.url,
            link.pathlink,
          ]);
        } else if (link.ok === 'fail') {
          table.push([
            chalk.red(link.status),
            link.text,
            link.url,
            link.pathlink,
          ]);
        }
      } else {
        table.push([
          '',
          link.text,
          link.url,
          link.pathlink,
        ]);
      }
    });

    console.log(table.toString());
  });
