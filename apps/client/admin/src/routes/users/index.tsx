import { createFileRoute } from "@tanstack/react-router";
import { lazyComponent, TableSkeleton } from "frontend-common";
import { PageHeader } from "@/lib/components/page-header";

const UsersSection = lazyComponent(
  () => import("./_lib/components/users-section").then((m) => m.UsersSection),
  <TableSkeleton columns={4} />,
);

export const Route = createFileRoute("/users/")({ component: UsersPage });

function UsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Shoppers and admins; promote someone to help run the shop." />
      <UsersSection />
    </>
  );
}
