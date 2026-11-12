import { useUsers } from "../api/hook";
import { UsersTable } from "./users-table";

export const UsersSection = () => {
  const { data } = useUsers();
  return <UsersTable users={data.items} />;
};
