import AsyncStorage from '@react-native-async-storage/async-storage';

export class TokenHandler {
  async setToken(token: string) {
    return await AsyncStorage.setItem('token', token);
  }

  async getToken() {
    return await AsyncStorage.getItem('token');
  }
}

const tokenHandler = new TokenHandler;
export default tokenHandler;
