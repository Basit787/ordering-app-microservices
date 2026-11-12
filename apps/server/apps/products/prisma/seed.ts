import { PrismaClient } from "@prisma-db/products";

const prisma = new PrismaClient();

// Sample catalogue for a fresh database; matched by slug, so running it again changes nothing
const CATALOGUE = [
  {
    category: { name: "Clothing", slug: "clothing" },
    products: [
      { name: "Classic cotton T-shirt", slug: "classic-cotton-t-shirt", priceCents: 49900, stock: 40 },
      { name: "Denim jacket", slug: "denim-jacket", priceCents: 249900, stock: 12 },
    ],
  },
  {
    category: { name: "Electronics", slug: "electronics" },
    products: [
      { name: "Wireless earbuds", slug: "wireless-earbuds", priceCents: 199900, stock: 25 },
      { name: "Smart watch", slug: "smart-watch", priceCents: 549900, stock: 8 },
    ],
  },
  {
    category: { name: "Home", slug: "home" },
    products: [
      { name: "Ceramic coffee mug", slug: "ceramic-coffee-mug", priceCents: 34900, stock: 60 },
      { name: "Table lamp", slug: "table-lamp", priceCents: 129900, stock: 15 },
    ],
  },
];

const main = async () => {
  for (const { category, products } of CATALOGUE) {
    const { id: categoryId } = await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: {},
    });
    for (const product of products) {
      await prisma.product.upsert({ where: { slug: product.slug }, create: { ...product, categoryId }, update: {} });
    }
  }
  console.log("Sample catalogue ready");
};

main().finally(() => prisma.$disconnect());
