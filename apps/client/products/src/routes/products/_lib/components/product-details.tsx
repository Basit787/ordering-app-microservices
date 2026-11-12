import { formatMoney, signInUrl, useAuth } from "frontend-common";
import { ShoppingCart } from "lucide-react";
import { Button, OamUiBadge, OamUiButton, OamUiNativeSelect } from "oamui";
import { useState } from "react";
import { useAddToCart } from "@/lib/api/hook";
import { ProductImage } from "@/lib/components/product-image";
import { StockLabel } from "@/lib/components/stock-label";
import { useProduct } from "../api/hook";

const MAX_PER_ORDER = 10;

export const ProductDetails = ({ productId }: { productId: string }) => {
  const { status } = useAuth();
  const { data: product } = useProduct(productId);
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImage src={product.imageUrl} alt={product.name} />
      <div className="space-y-5">
        <div className="space-y-2">
          {product.category && <OamUiBadge variant="secondary">{product.category.name}</OamUiBadge>}
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">{formatMoney(product.priceCents)}</p>
          <StockLabel stock={product.stock} />
        </div>
        {product.description && (
          <p className="leading-relaxed whitespace-pre-line text-muted-foreground">{product.description}</p>
        )}

        {product.stock > 0 && (
          <div className="flex items-end gap-3">
            <OamUiNativeSelect
              label="Quantity"
              className="w-28"
              value={String(quantity)}
              onChange={(event) => setQuantity(Number(event.target.value))}
              options={Array.from({ length: Math.min(product.stock, MAX_PER_ORDER) }, (_, index) => ({
                value: String(index + 1),
                label: String(index + 1),
              }))}
            />
            {status === "signedIn" ? (
              <OamUiButton
                icon={<ShoppingCart />}
                loading={addToCart.isPending}
                onClick={() => addToCart.mutate({ productId: product.id, quantity })}
              >
                Add to cart
              </OamUiButton>
            ) : (
              <Button asChild>
                <a href={signInUrl()}>Sign in to buy</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
