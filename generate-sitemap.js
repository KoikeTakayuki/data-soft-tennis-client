require('date-utils');

const mysql = require('mysql');
const dbConfig = require('./config/config.js');
const connection = mysql.createConnection(dbConfig);
const fs = require('fs');
const dt = new Date();

const writeHeader = (filename) => {
  return new Promise((success) => {
    fs.writeFileSync(filename, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">');
    success();
  });
};

const writeFooter = (filename) => {
  fs.appendFileSync(filename, '</urlset>');
};

const writeUrl = (filename, url) => {
  var time = dt.toFormat("YYYY-MM-DDTHH24:MI:SS+00:00");;
  fs.appendFileSync(filename, "<url><loc>" + url + "</loc><lastmod>" + time + "</lastmod></url>\n");
};

const FILE_NAME = './dist/sitemap.xml';


writeHeader(FILE_NAME)
.then((ids) => {
  console.log("set player");
  writeUrl(FILE_NAME, "http://data-soft-tennis.com");
  writeUrl(FILE_NAME, "http://data-soft-tennis.com/player");
  writeUrl(FILE_NAME, "http://data-soft-tennis.com/team");
  connection.query('SELECT id FROM player', (err, res) => {
    res.forEach((r) => { writeUrl(FILE_NAME, "http://data-soft-tennis.com/player/" + r.id) });
  });
})
.then(() => {
  console.log("set team");
  return new Promise((suc) => {
    connection.query('SELECT id FROM team', (err, res) => {
      res.forEach((r) => { writeUrl(FILE_NAME, "http://data-soft-tennis.com/team/" + r.id) });
      suc(res);
    });
  });
})
.then((res) => {
  console.log("finish");
  writeFooter(FILE_NAME);
  connection.end();
});