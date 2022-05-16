import { createContext } from "react";
import { UserInterface } from "../interfaces/user";

export const sampleUserContext: UserInterface = {
  email: "",
  name: "",
  role: "",
};

const UserContext = createContext<UserInterface>(sampleUserContext);
export default UserContext;
