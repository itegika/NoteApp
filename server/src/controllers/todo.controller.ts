import { Request } from "express";
import TodoService from "../services/todo.service";
import { authenticate } from "../middlewares/auth.middleware";

export class TodoController {
    constructor(private todoService: TodoService) {}

    async getAllTodo(req: Request) {
        const id = await authenticate(req);
        const todos = await this.todoService.findAll(id);
        return todos;
    }

    async getOneTodo(req: Request) {
        await authenticate(req);
        const { userId } = req.params;
        const todo = await this.todoService.findOne(userId);
        if ( todo?.userId === userId || todo?.isPublic) {
            return todo;
        }
        return "You don't have access";
    }

    async addTodo(req: Request) {
        const id = await authenticate(req);
        let todo = req.body;
        todo = {...todo, userId: id};
        if (!req.body.isPublic) {
          todo = {...todo, userId: id};
        }
        const data = await this.todoService.addTodo(todo);
        return data;
    }

    async deleteTodoById(req: Request) {
        const {id} = req.params;
        const todo = await this.todoService.deleteTodo(id);
        return todo;
    }

    async updateTodoById(req: Request) {
        const {id} = req.params;
        const body = req.body;
        const todo = await this.todoService.updateTodo(id, body);
        return todo;
    }
}

const todoController = new TodoController(new TodoService());
export default todoController;