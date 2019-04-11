'use strict';
const path = require('path');

const PROJECT_ROOT_PATH = path.resolve(__dirname, '..');

const APPLICATION_SOURCES_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const APPLICATION_ENTRY_PATH = path.resolve(APPLICATION_SOURCES_PATH, 'index.tsx');
const POLYFILLS_ENTRY_PATH = path.resolve(APPLICATION_SOURCES_PATH, 'polyfills.ts');
const HTML_TEMPLATE_PATH = path.resolve(APPLICATION_SOURCES_PATH, 'index.html');
const FAVICON_PATH = path.resolve(APPLICATION_SOURCES_PATH, 'assets/favicon.ico');

const OUTPUT_FOLDER = 'dist';
const OUTPUT_IMAGES_FOLDER = 'images';
const OUTPUT_SCRIPTS_FOLDER = 'scripts';
const OUTPUT_STYLES_FOLDER = 'styles';
const OUTPUT_PATH = path.resolve(PROJECT_ROOT_PATH, OUTPUT_FOLDER);

const E2E_TEMP_DIR_PATH = path.join(PROJECT_ROOT_PATH, 'e2e-temp-folder');
const E2E_WS_PATH = path.join(E2E_TEMP_DIR_PATH, 'wsEndpoint');

module.exports = {
  PROJECT_ROOT_PATH,
  APPLICATION_SOURCES_PATH,
  POLYFILLS_ENTRY_PATH,
  APPLICATION_ENTRY_PATH,
  HTML_TEMPLATE_PATH,
  FAVICON_PATH,
  OUTPUT_IMAGES_FOLDER,
  OUTPUT_SCRIPTS_FOLDER,
  OUTPUT_SCRIPTS_FOLDER,
  OUTPUT_STYLES_FOLDER,
  OUTPUT_PATH,
  E2E_TEMP_DIR_PATH,
  E2E_WS_PATH
};
