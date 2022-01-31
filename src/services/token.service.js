
class TokenService {

    static getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.access_token;
    };

    static updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    static getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    static setUser(user) {
        console.log(JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
    }

    static removeUser() {
        localStorage.removeItem("user");
    }

}
export default TokenService;