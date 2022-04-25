import HttpService from './http';
import { Todo } from '../types/todo.types';

class TodoService extends HttpService {
  constructor() {
    super();
  }
  async getAllTodos() {
    return await this.get({
      url: 'todos',
    }, false);
  }

  async addTodo(todo: Todo) {
    return await this.post({
      url: 'todos',
      data: todo,
    }, false);
  }
  async editTodo(id: string | undefined, todo: Todo) {
    return await this.put({
      url: `todos/${id}`,
      data: todo,
    }, false);
  }
  async deleteTodo(id: string | undefined) {
    return await this.delete({
      url: `todos/${id}`,
    }, false);
  }
}

const todosService = new TodoService;
export default todosService;
