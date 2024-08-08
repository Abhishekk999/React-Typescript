import cookie from "react-cookies";
const { REACT_PUBLIC_SITE_BASEURL } = process.env;
const cookieStorePath = `${REACT_PUBLIC_SITE_BASEURL || "/"}`;
const defaultOptions = {
  path: cookieStorePath,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
class StoreUtility {
  /** session storage **/
  static setSession(name: string, data: any) {
    if (name && data) {
      sessionStorage.setItem(name, data);
    }
  }
  static getSession(name: string) {
    return sessionStorage.getItem(name);
  }
  static removeSession(name: string) {
    sessionStorage.removeItem(name);
  }
  static clearSession() {
    sessionStorage.clear();
  }

  /** Cookies **/
  static setCookie(name: string, data: any, options: object = defaultOptions) {
    if (name && data) cookie.save(name, data, options);
  }

  static getCookie(name: string) {
    return cookie.load(name);
  }

  static removeCookie(name: string, options = defaultOptions) {
    cookie.remove(name, options);
  }

  static removeAllCookies() {
    const cookieKeys = cookie.loadAll();
    Object.keys(cookieKeys).map((c) => StoreUtility.removeCookie(c));
  }
}

export default StoreUtility;
