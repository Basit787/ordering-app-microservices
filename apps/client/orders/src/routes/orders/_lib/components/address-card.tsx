import type { Address } from "frontend-common";
import { OamUiCard } from "oamui";

export const AddressCard = ({ address }: { address: Address }) => (
  <OamUiCard title="Shipping to" description={address.fullName}>
    <address className="text-sm leading-relaxed text-muted-foreground not-italic">
      {address.line1}
      {address.line2 && <br />}
      {address.line2}
      <br />
      {address.city}, {address.state} {address.postalCode}
      <br />
      {address.country} · {address.phone}
    </address>
  </OamUiCard>
);
