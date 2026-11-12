// "In stock" / "Only 3 left" / "Out of stock"
export const StockLabel = ({ stock }: { stock: number }) => {
  if (stock === 0) return <span className="text-sm text-destructive">Out of stock</span>;
  if (stock <= 5) return <span className="text-sm text-muted-foreground">Only {stock} left</span>;
  return <span className="text-sm text-muted-foreground">In stock</span>;
};
