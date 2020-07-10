import express from 'express';
import controller from '../controllers/gradeController.js';

const app = express();

//req = request and res = response.

//Endpoint Create
app.post('/grade', controller.create);

//Endpoint Retrieve
app.get('/grade', controller.findAll);

app.get('/grade/:id', controller.findOne);

//Endpoint Update by id
app.patch('/grade/:id', controller.update);

//Endpoint Delete
app.delete('/grade/:id', controller.remove);
app.delete('/grade', controller.removeAll);

export { app as studentRouter };
