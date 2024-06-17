// server.js
import express from 'express';
import dotenv from 'dotenv';
// No longer needed
// import 'babel-polyfill';
import ReflectionWithJsObject from './usingJSObject/controllers/reflections';
import ReflectionWithDB from './usingDB/controllers/reflections';
import UserWithDb from './usingDB/controllers/users';
import Auth from './usingDB/middleware/auth';

dotenv.config({path:"../env."});
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working!'});
});

app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login',UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(8080)
console.log('app running on port ', 8080);