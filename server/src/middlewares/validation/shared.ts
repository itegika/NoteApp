import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";

export const validation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({
          status: "error",
          code: 400,
          message: error.message,
        });
        return;
      }
    next();
  };
};



export const isExist = <T extends Model<any>> (DBModel: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      await DBModel.findById(id);
      next();
    } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
    }
  };
};

export const controllerWrapper = (ctrl: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await ctrl (req, res, next);
        res.status(200).send(result);
      } catch (err) {
          res.status(500).send();
      }
  };
};

