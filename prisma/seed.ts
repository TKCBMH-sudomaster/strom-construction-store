import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();

  const supplier = await prisma.supplier.create({
    data: { name: "MockSupply Co.", apiUrl: "http://localhost:4000" },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Hard Hat (Orange)",
        description: "Class E safety helmet",
        priceCents: 2499,
        imageUrl: "/products/hard-hat.svg",
        category: "Safety Gear",
        fulfillmentType: "MANUAL",
        stock: 40,
      },
      {
        name: "Steel-Toe Work Boots",
        description: "Waterproof, slip resistant",
        priceCents: 8999,
        imageUrl: "/products/work-boots.svg",
        category: "Safety Gear",
        fulfillmentType: "MANUAL",
        stock: 15,
      },
      {
        name: "Cordless Drill 20V",
        description: "Brushless, 2 batteries",
        priceCents: 12999,
        imageUrl: "/products/cordless-drill.svg",
        category: "Power Tools",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "DRL-20V",
      },
      {
        name: "Laser Level Kit",
        description: "Self-leveling cross line",
        priceCents: 7999,
        imageUrl: "/products/laser-level.svg",
        category: "Measuring",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "LSR-100",
      },
    ],
  });

  console.log("Seeded products and supplier.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());