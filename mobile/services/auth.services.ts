import HttpService from './http';
import { IUser } from '../types/user.types';
import tokenHandler from './storage';

class AuthService extends HttpService {
  constructor() {
    super();
  }
  async login( user: IUser ) {
    const { data } = await this.post({
      url: 'user/login',
      data: user,
    });
    if (data) {
      tokenHandler.setToken(data);
    } else throw new Error('Login error');
  }

  async register( user: IUser ) {
    const { data } = await this.post({
      url: 'user/register',
      data: user,
    }, false);
    if (data) {
      return data;
    } else throw new Error('Register error');
  }
}

const authService = new AuthService;
export default authService;
