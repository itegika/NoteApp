import Joi from "joi";

export const joiTodoSchema = Joi.object({
  title: Joi.string().min(3).max(25).trim(true).required(),
  description: Joi.string().min(3).max(250).trim(true).required(),
  year: Joi.number().integer().min(2022).max(2500).required(),
  isCompleted: Joi.boolean().default(false),
  isPublic: Joi.boolean().default(false),
  userId: Joi.string()
});

export const joiUserSchema = Joi.object({
  email: Joi.string().min(2).max(28).trim(true).required(),
  password: Joi.string().min(8).max(16).trim(true).required(),
  avatar: Joi.string().min(2).max(20).trim(true),
});