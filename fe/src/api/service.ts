import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { JWT_FILED_NAME } from "../global";

class Service {
  service = axios.create({
    headers: { csrf: "token" },
  });
  constructor() {
    let service = axios.create({
      headers: { csrf: "token" },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    service.interceptors.request.use(
      (req: any) => {
        return (req.headers["x-auth-token"] = String(
          localStorage.getItem(JWT_FILED_NAME)
        ));
      },
      (err) => {
        Promise.reject(err);
      }
    );
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, "/");
        break;
      case 404:
        this.redirectTo(document, "/404");
        break;
      default:
        this.redirectTo(document, "/500");
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path, callback) {
    return this.service
      .get(path)
      .then((response) => callback(response.status, response.data))
      .catch((err) => {console.error(err)});
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    return this!.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => callback(response.status, response.data));
  }
}

export default Service;
