import { Link } from "@tanstack/react-router";
import { frontendUrl, useAuth } from "frontend-common";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Button } from "oamui";

export const Hero = () => {
  const { status, user } = useAuth();
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/50 to-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div className="space-y-6">
          <p className="text-sm font-medium text-primary">
            {status === "signedIn" ? `Welcome back, ${user?.name}` : "Everyday things, delivered across India"}
          </p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
            Shop calmly. Pay securely. Track every order.
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            A small, carefully kept catalogue, Razorpay checkout and live order tracking — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={frontendUrl("products")}>
                Start shopping
                <ArrowRight />
              </a>
            </Button>
            {status === "signedOut" && (
              <Button asChild size="lg" variant="outline">
                <Link to="/sign-in">Create an account</Link>
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Secure Razorpay payments
            </span>
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-primary" />
              Track from paid to delivered
            </span>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex" aria-hidden>
          <div className="grid grid-cols-2 gap-4">
            {["bg-primary/15", "bg-secondary", "bg-muted", "bg-accent"].map((tone, index) => (
              <div key={tone} className={`size-36 rounded-3xl ${tone} ${index % 2 ? "translate-y-6" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
