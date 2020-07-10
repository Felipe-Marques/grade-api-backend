import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Student = db.student;

const create = async (req, res) => {
  const { name, subject, type, value } = req.body;
  const student = new Student({
    name,
    subject,
    type,
    value,
  });
  try {
    await student.save(student);

    res.send({ message: 'Estudante salvo com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify(message)}`);
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(err.message)}`);
  }
};

const findAll = async (req, res) => {
  const { name } = req.query;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const student = await Student.find(condition);

    res.send(student);
    logger.info(`GET /grade`);
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(err.message)}`);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById({ _id: id });

    if (!student) {
      res
        .status(404)
        .send({ message: `Estudante com id: ${id} não encontrado` });
    } else {
      res.send(student);
      logger.info(`GET /grade - ${id}`);
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message || `Erro ao buscar o Documento id: ${id}` });
    logger.error(`GET /grade - ${JSON.stringify(err.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .send({ message: 'Dados para atualização inexistentes' });

  const { id } = req.params;

  try {
    const student = await Student.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.send({ message: 'Dados do estudante atualizados com sucesso' });
    logger.info(`PATCH /grade - ${JSON.stringify(req.body)}`);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Erro ao atualizar o estudante id: ${id}`,
    });
    logger.error(`PATCH /grade/:id - ${JSON.stringify(err.message)}`);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete({ _id: id });

    res.send({ message: 'Dados de estudante excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Nao foi possivel deletar os dados do estudante id: ${id}`,
    });
    logger.error(`DELETE /grade - ${JSON.stringify(err.message)}`);
  }
};

const removeAll = async (_, res) => {
  try {
    const student = await Student.deleteMany();
    if (!student) {
      res.status(404).send({ message: `Não há registros de estudantes` });
    } else {
      res.send({ message: 'Estudantes excluidos com sucesso' });
    }

    logger.info(`DELETE /grade`);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Nao foi possivel deletar os dados do estudante id: ${id}`,
    });
    logger.error(`DELETE /grade - ${JSON.stringify(err.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
