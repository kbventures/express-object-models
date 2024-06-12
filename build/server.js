"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
require("babel-polyfill");
var _Reflections = _interopRequireDefault(require("./src/usingJSObject/controllers/Reflections"));
var _Reflections2 = _interopRequireDefault(require("./src/usingDB/controllers/Reflections"));
var _Users = _interopRequireDefault(require("./src/usingDB/controllers/Users"));
var _Auth = _interopRequireDefault(require("./src/usingDB/middleware/Auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// server.js

_dotenv.default.config();
const Reflection = process.env.TYPE === 'db' ? _Reflections2.default : _Reflections.default;
const app = (0, _express.default)();
app.use(_express.default.json());
app.get('/', (req, res) => {
  return res.status(200).send({
    'message': 'YAY! Congratulations! Your first endpoint is working'
  });
});
app.post('/api/v1/reflections', _Auth.default.verifyToken, Reflection.create);
app.get('/api/v1/reflections', _Auth.default.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', _Auth.default.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', _Auth.default.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', _Auth.default.verifyToken, Reflection.delete);
app.post('/api/v1/users', _Users.default.create);
app.post('/api/v1/users/login', _Users.default.login);
app.delete('/api/v1/users/me', _Auth.default.verifyToken, _Users.default.delete);
app.listen(3001);
console.log('app running on port ', 3001);