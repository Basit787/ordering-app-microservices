import { CreditCard, PackageCheck, ShoppingCart } from "lucide-react";
import { ItemMedia, OamUiItem } from "oamui";

const STEPS = [
  { icon: ShoppingCart, title: "Pick what you need", text: "Browse the shop and add items to your cart." },
  { icon: CreditCard, title: "Pay with Razorpay", text: "Cards, UPI and netbanking, confirmed instantly." },
  { icon: PackageCheck, title: "Follow your order", text: "From placed to delivered, always up to date." },
];

export const HowItWorks = () => (
  <section className="border-y bg-muted/40">
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3 md:px-6">
      {STEPS.map(({ icon: Icon, title, text }, index) => (
        <OamUiItem
          key={title}
          variant="outline"
          className="bg-background"
          media={
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
          }
          title={`${index + 1}. ${title}`}
          description={text}
        />
      ))}
    </div>
  </section>
);
