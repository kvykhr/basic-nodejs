const router = require('express').Router({ mergeParams: true });
const asyncHandler = require('../../middlewares/async-handler.middleware');
const tasksService = require('./task.service');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const tasks = await tasksService.getAllByBoardId(req.params.boardId);
    res.json(tasks);
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const task = req.body;
    task.boardId = req.params.boardId;
    const tasks = await tasksService.create(task);
    res.json(tasks);
  })
);

router.route('/:taskId').get(
  asyncHandler(async (req, res) => {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );
    if (!task) {
      res.status(404);
      res.json({ message: 'not found' });
    }
    res.json(task);
  })
);

router.route('/:taskId').put(
  asyncHandler(async (req, res) => {
    const task = req.body;
    task.boardId = req.params.boardId;
    const id = req.params.taskId;
    const result = await tasksService.update(id, task);
    res.json(result);
  })
);

router.route('/:taskId').delete(
  asyncHandler(async (req, res) => {
    const result = await tasksService.deleteById(
      req.params.boardId,
      req.params.taskId
    );
    res.json(result);
  })
);

module.exports = {
  taskRouter: router
};
