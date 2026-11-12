import { Link } from "@tanstack/react-router";
import { formatMoney, type Product } from "frontend-common";
import { Card, CardContent } from "oamui";
import { ProductImage } from "@/lib/components/product-image";
import { StockLabel } from "@/lib/components/stock-label";

export const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to="/products/$productId"
    params={{ productId: product.id }}
    className="group block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
  >
    <Card className="h-full gap-0 overflow-hidden py-0 transition-colors group-hover:border-primary/40">
      <ProductImage src={product.imageUrl} alt={product.name} className="rounded-none" />
      <CardContent className="space-y-1 p-4">
        {product.category && <p className="text-xs text-muted-foreground">{product.category.name}</p>}
        <p className="line-clamp-2 font-medium">{product.name}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-semibold">{formatMoney(product.priceCents)}</span>
          <StockLabel stock={product.stock} />
        </div>
      </CardContent>
    </Card>
  </Link>
);
