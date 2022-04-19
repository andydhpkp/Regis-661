const tasksService = new TasksService();
const todo = new ToDo(tasksService);

describe('Todo App', () => {
  it('should initialize some HTML', () => {
    spyOn(todo, 'init');
    todo.init();

    expect(todo.init).toHaveBeenCalled();
  });

  it('should add a task', async () => {
    const newTask = {
      task_id: 0,
      task_name: 'Test Task',
      status: 'pending',
      created_date: '2022-04-19 15:42:12',
    };
    const addTaskServiceSpy = spyOn(tasksService, 'addTask');

    expect(todo.tasks.length).toBe(0);

    await todo.addTask(newTask);

    expect(addTaskServiceSpy).toHaveBeenCalled();
    expect(todo.tasks.length).toBe(1);
  });

  it('should delete a task', async () => {
    const existingTask = {
      task_id: 0,
      task_name: 'Test Task',
      status: 'pending',
      created_date: '2022-04-19 15:42:12',
    };
    const deleteTaskServiceSpy = spyOn(tasksService, 'deleteTask');

    expect(todo.tasks.length).toBe(1);

    await todo.deleteTask(existingTask.task_id);

    expect(deleteTaskServiceSpy).toHaveBeenCalled();
    expect(todo.tasks.length).toBe(0);
  });

  xit('should update an individual task', async () => {
    await todo.getTasks();
    let toUpdateTasks = todo.tasks;
    let taskExists = false;
    let testTask = {};
    const update = /UpdateTestItem/;
    toUpdateTasks.forEach(task => {
      if(update.exec(task.task_name)) {
        taskExists = true;
        testTask = task
      }
    });
    if(!taskExists) {
      const newTask = {
        task_id: 1,
        task_name: 'Update Test Task',
        status: 'pending',
        created_date: '2022-04-19 15:42:12',
      }
      await tasksService.addTask(newTask);
      await todo.getTasks();
      let newTasks = todo.tasks;
      newTasks.forEach(task => {
        if(update.exec(task.task_name)) {
          testTask = task
        }
      })
    }
  });
});
