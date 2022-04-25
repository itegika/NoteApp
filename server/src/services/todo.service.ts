import { Todo, ITodo } from "../models/Todo";

export default class TodoService {
    async findAll(id: string) {
        const todos = await Todo.find({
            $or: [{ isPublic: true },
                { userId: id }]
            });
            return todos;
        }

    async findOne(id: String) {
        const todo = await Todo.findById(id);
        return todo;
    }

    async addTodo(todo: ITodo) {
        const newTodo = await Todo.create(todo);
        return newTodo;
    }

    async deleteTodo(id: String) {
     const deletedTodo = await Todo.findByIdAndDelete(id);
     return deletedTodo;
    }

    async updateTodo(id: String, todo: ITodo) {
        const updatedTodo = Todo.findByIdAndUpdate(id, todo, {new: true});
        return updatedTodo;
    }
}