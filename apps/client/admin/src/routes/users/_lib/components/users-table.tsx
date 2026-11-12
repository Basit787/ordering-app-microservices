import { type AuthAccount, formatDate, useAuth } from "frontend-common";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { OamUiBadge, OamUiDataTable, type OamUiDataTableColumn, type OamUiRowAction } from "oamui";
import { useSetUserRole } from "../api/hook";

export const UsersTable = ({ users }: { users: AuthAccount[] }) => {
  const { user: me } = useAuth();
  const setRole = useSetUserRole();

  const columns: OamUiDataTableColumn<AuthAccount>[] = [
    { id: "name", header: "Name", sortable: true, cell: (user) => <span className="font-medium">{user.name}</span> },
    { id: "email", header: "Email", sortable: true },
    {
      id: "role",
      header: "Role",
      sortable: true,
      searchable: false,
      cell: (user) =>
        user.role === "admin" ? <OamUiBadge>Admin</OamUiBadge> : <OamUiBadge variant="secondary">Shopper</OamUiBadge>,
    },
    {
      id: "createdAt",
      header: "Joined",
      sortable: true,
      searchable: false,
      className: "max-md:hidden",
      cell: (user) => formatDate(user.createdAt),
    },
  ];

  // The server refuses removing your own admin role; the menu does not offer it
  const singleRowActions: OamUiRowAction<AuthAccount>[] = [
    {
      label: "Make admin",
      icon: <ShieldCheck />,
      hidden: (user) => user.role === "admin",
      onSelect: (user) => setRole.mutate({ id: user.id, role: "admin" }),
      confirm: {
        title: "Make this user an admin?",
        description: ([user]) => `${user.name} will manage products, orders, payments and users.`,
        confirmText: "Make admin",
      },
    },
    {
      label: "Remove admin",
      icon: <ShieldOff />,
      destructive: true,
      hidden: (user) => user.role !== "admin" || user.id === me?.id,
      onSelect: (user) => setRole.mutate({ id: user.id, role: "user" }),
    },
  ];

  return (
    <OamUiDataTable
      data={users}
      getRowId={(user) => user.id}
      columns={columns}
      singleRowActions={singleRowActions}
      searchPlaceholder="Search by name or email…"
      emptyText="No users match."
    />
  );
};
