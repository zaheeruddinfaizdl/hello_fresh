import React, { useContext, useState } from "react";
import FloatingMessage from "./floatingMsg";
import UserContext from "../context/user";

interface Props {
  children: React.ReactElement;
  rolesAllowed: Array<String>;
}

export default function RoleGuarded({ children, rolesAllowed }: Props) {
  const currentUser = useContext(UserContext);
  if (currentUser.role in rolesAllowed) {
  }
  const [showFloatingMessage, setShowFloatingMessage] = useState(true);
  const isRoleAllowed = rolesAllowed.find((role) => {
    return role === currentUser.role;
  });
  if (Boolean(isRoleAllowed)) {
    return <>{children}</>;
  }
  return <></>;
}
