import AuthUtility from "./auth";
import StoreUtility from "./store";

class ApiUtility {
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Something went wrong");
    }
    return await response.json();
  }

  private validateRequest(data: any) {
    if (data.constructor.name === "FormData") return data;
    else return JSON.stringify(data);
  }

  private async callApi(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    headers: HeadersInit = { "Content-Type": "application/json" },
    body?: any
  ): Promise<any> {
    const options: RequestInit = {
      method,
      headers: body instanceof FormData ? {} : headers,
      ...AuthUtility.getToken(),
    };

    if (body) {
      options.body = this.validateRequest(body);
    }

    try {
      const response = await fetch(url, options);
      if (response.status >= 200 && response.status <= 299) {
        return this.handleResponse(response);
      } else {
        if (response.status === 403 || response.status === 401) {
          StoreUtility.removeAllCookies();
          window.location.href = "/";
        }
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

  public async get(url: string, headers?: HeadersInit): Promise<any> {
    return await this.callApi(url, "GET", headers);
  }

  public async post(
    url: string,
    body: any,
    headers?: HeadersInit
  ): Promise<any> {
    return await this.callApi(url, "POST", headers, body);
  }

  public async put(
    url: string,
    body: any,
    headers?: HeadersInit
  ): Promise<any> {
    return await this.callApi(url, "PUT", headers, body);
  }

  public async delete(url: string, headers?: HeadersInit): Promise<any> {
    return await this.callApi(url, "DELETE", headers);
  }
}
const apiUtil = new ApiUtility();
export default apiUtil;
