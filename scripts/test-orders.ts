import { prisma } from "../lib/db";
import { createOrder } from "../lib/fulfillment";

async function main() {
  const hat = await prisma.product.findFirstOrThrow({
    where: { name: "Hard Hat (Orange)" },
  });
  const drill = await prisma.product.findFirstOrThrow({
    where: { name: "Cordless Drill 20V" },
  });

  const order = await createOrder("test@example.com", [
    { productId: hat.id, quantity: 2 },
    { productId: drill.id, quantity: 1 },
  ]);

  console.log("Order created:", order.id);
  for (const item of order.items) {
    console.log(`- ${item.fulfillment}: ${item.status} (qty ${item.quantity})`);
  }

  const hatAfter = await prisma.product.findUniqueOrThrow({
    where: { id: hat.id },
  });
  console.log(`Hard hat stock: ${hat.stock} -> ${hatAfter.stock}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());