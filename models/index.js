import mongoose from 'mongoose';
import studentModel from './studentModel.js';
import dotenv from 'dotenv';
dotenv.config();

//Variaveis de Ambiente.

const db = {};
db.mongoose = mongoose;
db.url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@Bootcamp.gpins.mongodb.net/grades?retryWrites=true&w=majority`;
db.port = process.env.PORT;
db.student = studentModel(mongoose);

export { db };
