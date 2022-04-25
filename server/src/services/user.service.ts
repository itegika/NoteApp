import { User } from "../models/User";
import { getToken } from "../middlewares/auth.middleware";

export default class UserService {
    async register(email: string, password: string) {
        await User.create({ email, password });
        const data = getToken(email);
        return data;
    }
    async login(email: string, _: any) {
        const data = getToken(email);
        return data;
    }
}