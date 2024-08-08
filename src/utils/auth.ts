import StoreUtility from "./store";

class AuthUtility {
  static async logout(): Promise<Boolean> {
    StoreUtility.removeAllCookies();
    return true;
  }

  static async refreshToken(): Promise<Boolean> {
    return false;
  }

  static isTokenExist() {
    const token = StoreUtility.getCookie("");
    return token ?? token;
  }

  static setToken(token: string) {
    StoreUtility.setCookie("token", `Bearer ${token}`);
  }

  static getToken(): object {
    const token: any = StoreUtility.getCookie("token");
    return token ? { Authorization: token } : {};
  }
}

export default AuthUtility;
