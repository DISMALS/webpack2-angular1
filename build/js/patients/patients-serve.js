/*! author:wangyong, hash:5e4810, chunkhash:bfc1b0, name:./patients/patients-serve, filebase:patients-serve.js, query:?bfc1b0, file:js/./patients/patients-serve.js */
webpackJsonp([31],{

/***/ 723:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"../../../../config/data/patient.json\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nmodule.exports = function (ngMold) {\n    ngMold.factory('patientsService', ['Http', '$cookies', function (Http, $cookies) {\n        var http = new Http();\n\n        var _patients = function _patients() {\n            return http.get('/config/data/patient.json', { isMask: true });\n        };\n\n        return {\n            patients: _patients\n        };\n    }]).name;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzIzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL3ZpZXcvcGF0aWVudHMvc2VydmljZS9wYXRpZW50cy1zZXJ2aWNlLmpzPzJlOTAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuLi8uLi8uLi8uLi9jb25maWcvZGF0YS9wYXRpZW50Lmpzb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9sZCkge1xuICAgIG5nTW9sZC5mYWN0b3J5KCdwYXRpZW50c1NlcnZpY2UnLCBbJ0h0dHAnLCAnJGNvb2tpZXMnLCBmdW5jdGlvbiAoSHR0cCwgJGNvb2tpZXMpIHtcbiAgICAgICAgdmFyIGh0dHAgPSBuZXcgSHR0cCgpO1xuXG4gICAgICAgIHZhciBfcGF0aWVudHMgPSBmdW5jdGlvbiBfcGF0aWVudHMoKSB7XG4gICAgICAgICAgICByZXR1cm4gaHR0cC5nZXQoJy9jb25maWcvZGF0YS9wYXRpZW50Lmpzb24nLCB7IGlzTWFzazogdHJ1ZSB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF0aWVudHM6IF9wYXRpZW50c1xuICAgICAgICB9O1xuICAgIH1dKS5uYW1lO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC92aWV3L3BhdGllbnRzL3NlcnZpY2UvcGF0aWVudHMtc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMzEiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///723\n");

/***/ })

});