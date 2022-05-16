import { UserInterface } from "../interfaces/user";
import Service from "./service";
import { JWT_FILED_NAME } from "../global";
import axios from "axios";
import { APIResponse } from "../interfaces/response";
axios.interceptors.request.use(
  (req: any) => {
    req.headers["x-auth-token"] = String(localStorage.getItem(JWT_FILED_NAME));
    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);
export async function getCurrentUser(): Promise<UserInterface | null> {
  try {
    const response = await axios.get<APIResponse<UserInterface>>("/api/auth");
    return response.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default "";
