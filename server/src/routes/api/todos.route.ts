import { Router } from "express";
import { Todo } from "../../models/Todo";
import todoController from "../../controllers/todo.controller";
import { controllerWrapper, validation, isExist } from "../../middlewares/validation/shared";
import { joiTodoSchema } from "../../middlewares/validation/joiValidation";

const todosRouter: Router = Router();

todosRouter.get("/", controllerWrapper(todoController.getAllTodo.bind(todoController)));

todosRouter.get("/:id", isExist(Todo), controllerWrapper(todoController.getOneTodo.bind(todoController)));

todosRouter.post("/", validation(joiTodoSchema), controllerWrapper(todoController.addTodo.bind(todoController)));

todosRouter.delete("/:id", isExist(Todo), controllerWrapper(todoController.deleteTodoById.bind(todoController)));

todosRouter.put("/:id", isExist(Todo), validation(joiTodoSchema), controllerWrapper(todoController.updateTodoById.bind(todoController)));

export default todosRouter;
