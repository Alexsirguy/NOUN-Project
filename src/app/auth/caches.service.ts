export abstract class CacheService {
  protected getItem<T>(key: string): T {
    const data = localStorage.getItem(key);
    if (data && data !== "undefined") {
      return JSON.parse(data);
    }
    return null;
  }

  protected setItem(key: string, data: object | string) {
    if (typeof data === "string") {
      localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  protected removeItem(key: string) {
    localStorage.removeItem(key);
  }

  protected clear() {
    localStorage.clear();
  }

  protected setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  protected getCookie(cname) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + cname + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  protected deleteCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() - exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}
