import api from './api-interceptor.service';
import TokenService from './token.service';

class AuthService {
  login(username: string, password: string) {    
    return api.post("/auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.data.access_token) {
          TokenService.setUser(response.data.data);          
        }

        return response.data.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }


  getCurrentUser() {
    return api
    .get("/users")
    .then(response => {      
      if(response.data.data) {
        return response.data.data;
      }

      return null;
    }).catch( reason => null);
  }
}

export default new AuthService();
