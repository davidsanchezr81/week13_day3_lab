/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const CountriesView = __webpack_require__(/*! ./views/view.js */ \"./client/src/views/view.js\");\nconst Request = __webpack_require__(/*! ./services/request.js */ \"./client/src/services/request.js\");\n\nconst restCountriesRequest = new Request(\"https://restcountries.eu/rest/v2/all\");\nconst serverRequest = new Request(\"http://localhost:3000/countries\");\nconst countriesView = new CountriesView();\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const countriesDropdown = document.querySelector('#countries-dropdown');\n\n  const populateDropdown = function() {\n    restCountriesRequest.get((data)=> {\n      countriesView.renderDropdown(data);\n      countriesDropdown.addEventListener('change', onCountrySelect);\n    });\n  }\n\n  populateDropdown();\n});\n\n\nconst onCountrySelect = function(event){\n\n  serverRequest.post( () => {\n    countriesView.renderOne(event.target.value);\n  },\n  event.target.value\n);\n}\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ }),

/***/ "./client/src/services/request.js":
/*!****************************************!*\
  !*** ./client/src/services/request.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url){\n  this.url = url;\n}\n\nRequest.prototype.get = function(callback){\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n  request.addEventListener('load', function(){\n    if(request.status !== 200) return;\n\n    const response = JSON.parse(request.responseText);\n\n    callback(response);\n  })\n  request.send();\n};\n\nRequest.prototype.post = function(callback, dataToPost){\n  const request = new XMLHttpRequest();\n  request.open('POST', this.url);\n\n  request.setRequestHeader('Content-Type', 'application/json')\n\n  request.addEventListener('load', function(){\n    if(request.status !== 201) return;\n\n    const response = JSON.parse(request.responseText);\n\n    callback(response);\n\n  });\n  const jsonDataToPost = JSON.stringify(dataToPost);\n  request.send(jsonDataToPost);\n}\n\n\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./client/src/services/request.js?");

/***/ }),

/***/ "./client/src/views/view.js":
/*!**********************************!*\
  !*** ./client/src/views/view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CountriesView = function(){\n  this.countries = [];\n\n  CountriesView.prototype.renderDropdown = function (apiCountriesData) {\n    const select = document.querySelector('#countries-dropdown');\n\n    // this.countries = countriesData;\n\n    apiCountriesData.forEach((country, index) => {\n      const option = document.createElement('option');\n      option.value = country.name;\n      option.textContent = country.name;\n      select.appendChild(option);\n    });\n  };\n\n  CountriesView.prototype.renderDB = function (dbCountriesData) {\n      const ul = document.querySelector('#countries');\n\n    dbCountriesData.forEach((country) => {\n      const li = document.createElement('li');\n      li.textContent = country.name;\n      ul.appendChild(li);\n\n    });\n  };\n\n  CountriesView.prototype.renderOne = function (countryName) {\n      const ul = document.querySelector('#countries');\n      const li = document.createElement('li');\n      li.textContent = countryName;\n      ul.appendChild(li);\n\n  };\n\n\n}\nmodule.exports = CountriesView;\n\n\n//# sourceURL=webpack:///./client/src/views/view.js?");

/***/ })

/******/ });