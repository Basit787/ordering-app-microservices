import { usePayments } from "../api/hook";
import { PaymentsTable } from "./payments-table";

export const PaymentsSection = () => {
  const { data } = usePayments();
  return <PaymentsTable payments={data.items} />;
};
