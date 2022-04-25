import { Request } from "express";
import { User } from "../models/User";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs";
import { Unauthorized, Conflict } from "http-errors";


export class UserController {
    constructor(private userService: UserService) { }

    async register(req: Request) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict("Email already in use");
        }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const data = await this.userService.register( email, hashPassword );
        return data;
    }
    async login (req: Request) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Unauthorized("Email or password is wrong");
        }
        const data = await this.userService.login(email, user.password);
        return data;
    }
}

const userController = new UserController(new UserService());
export default userController;