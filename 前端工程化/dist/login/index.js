/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/login/index.css"
/*!*****************************!*\
  !*** ./src/login/index.css ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/./src/login/index.css?\n}");

/***/ },

/***/ "./src/login/index.js"
/*!****************************!*\
  !*** ./src/login/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/check.js */ \"./src/utils/check.js\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./src/login/index.css\");\n/* harmony import */ var _assets_headimg_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/headimg.png */ \"./src/assets/headimg.png\");\n\n\n// console.log(checkphone('13277772252'))\n// console.log(checkcode('99663366'))\ndocument.querySelector('.btn').addEventListener('click', () => {\n    const phone = document.querySelector('.xtx-form [name=phone]').value\n    const code = document.querySelector('.xtx-form-code [name=code]').value\n\n    if(!(0,_utils_check_js__WEBPACK_IMPORTED_MODULE_0__.checkphone)(phone)) {\n        console.log('手机号长度不对');\n        return\n    }\n\n    if(!(0,_utils_check_js__WEBPACK_IMPORTED_MODULE_0__.checkcode)(code)) {\n        console.log('验证码长度不对');\n        return \n    }\n    \n    console.log('注册成功');\n    \n})\n\n;\n\n\n\nconst theImg = document.createElement('img')\ntheImg .src = _assets_headimg_png__WEBPACK_IMPORTED_MODULE_2__\ndocument.querySelector('.xtx-form').appendChild(theImg)\n\n\n// 1 默认 webpack-dev-server 借助http 模块创建8080 默认 web服务\n// 2 默认以public 文件夹 为服务器的根目录\n// 3 webpack-dev-server 根据配置 打包相关代码 在内存中  以 output.path 的值作为服务器根目录 => 可以拼接访问dist目录下的内容\n\n//# sourceURL=webpack://%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/./src/login/index.js?\n}");

/***/ },

/***/ "./src/utils/check.js"
/*!****************************!*\
  !*** ./src/utils/check.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkcode: () => (/* binding */ checkcode),\n/* harmony export */   checkphone: () => (/* binding */ checkphone)\n/* harmony export */ });\nconst checkphone = phone => phone.length === 11\nconst checkcode = code => code.length === 6\n\n//# sourceURL=webpack://%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/./src/utils/check.js?\n}");

/***/ },

/***/ "./src/assets/headimg.png"
/*!********************************!*\
  !*** ./src/assets/headimg.png ***!
  \********************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{module.exports = __webpack_require__.p + \"assets/c337cfbe25de86e2accf.png\";\n\n//# sourceURL=webpack://%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/./src/assets/headimg.png?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		const document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^https?:/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:|[?#].*$/g, "").replace(/\/[^/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/login/index.js");
/******/ 	
/******/ })()
;