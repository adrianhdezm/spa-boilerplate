'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const webpack = require('webpack');
const express = require('express');
const rimraf = require('rimraf');

const config = require('../../webpack.config');
const { OUTPUT_PATH, E2E_TEMP_DIR_PATH } = require('../../config/paths');

const startE2EServer = () => {
  return new Promise((resolve, reject) => {
    // Build the production environment
    webpack(config({ production: true }), (err, stats) => {
      // Stats Object
      if (err || stats.hasErrors()) {
        return reject('Compiling Errors...');
      }
      // Creat a static server
      const app = express();
      //set the port
      app.use(express.static(OUTPUT_PATH));
      app.get('/*', (req, res) => {
        res.sendFile(path.join(OUTPUT_PATH, 'index.html'));
      });

      const server = http.createServer(app);
      const PORT = parseInt(process.env.PORT, 10) || 8080;
      server.listen(PORT, () => {
        console.log(`E2EServer is running on http://localhost:${PORT}`);
        resolve(server);
      });
    });
  });
};

const cleanE2EFolders = () => {
  if (fs.existsSync(OUTPUT_PATH)) {
    rimraf.sync(OUTPUT_PATH);
  }

  if (fs.existsSync(E2E_TEMP_DIR_PATH)) {
    rimraf.sync(E2E_TEMP_DIR_PATH);
  }
};

module.exports = {
  startE2EServer,
  cleanE2EFolders
};
