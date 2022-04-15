const escape = require('mysql').escape;
const connection = require('../db-config');
const {
  ALL_TASKS,
  SINGLE_TASK,
  INSERT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} = require('../queries/tasks.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/tasks
exports.getAllTasks = async (req, res) => {

  const con = await connection().catch((err) => {
    throw err;
  });

  const tasks = await query(con, ALL_TASKS(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!tasks.length) {
    res.status(200).json({ msg: 'No tasks available for this user.' });
  }
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const task = await query(
    con,
    SINGLE_TASK(req.user.id, req.params.taskId)
  ).catch(serverError(res));

  if (!task.length) {
    res.status(400).json({ msg: 'No tasks available for this user.' });
  }
  res.json(task);
}; 

exports.createTask = async (req, res) => {
  const user = req.user; 
  console.log('WELL SOMETHING HAPPENED')
  if (user.id) {

    const con = await connection().catch((err) => {
      throw err;
    });

    const taskName = escape(req.body.task_name);
    const result = await query(con, INSERT_TASK(user.id, taskName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add task: ${req.body.task_name}` });
    }
    res.json({ msg: 'Added task successfully!' });
  }
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    (key) => `${key} = ${escape(body[key])}` 
  );

  values.push(`created_date = NOW()`); 
  values.join(', '); 
  return values;
};

exports.updateTask = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  const result = await query(
    con,
    UPDATE_TASK(req.user.id, req.params.taskId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update task: '${req.body.task_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/tasks/1
exports.deleteTask = async (req, res) => {

  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(
    con,
    DELETE_TASK(req.user.id, req.params.taskId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete task at: ${req.params.taskId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};