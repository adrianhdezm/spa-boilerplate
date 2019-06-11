// polyfill only stable ES features:
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/promise';
// React depends on requestAnimationFrame (even in test environments).
import 'raf/polyfill';
// polyfill fetch
import 'whatwg-fetch';
// other polyfills
import 'core-js/es/array/includes';
import 'core-js/es/array/fill';
import 'core-js/es/string/includes';
import 'core-js/es/string/trim';
import 'core-js/es/object/values';
