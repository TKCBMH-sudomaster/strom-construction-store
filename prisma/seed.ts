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
      // ---------- Safety Gear (in stock, ships from Strom) ----------
      {
        name: "Hard Hat (Orange)",
        description: "Class E vented safety helmet, 6-point suspension",
        priceCents: 2499,
        imageUrl: "/products/hard-hat.jpg",
        category: "Safety Gear",
        fulfillmentType: "MANUAL",
        stock: 40,
      },
      {
        name: "Steel-Toe Work Boots",
        description: "Waterproof, slip resistant, electrical hazard rated",
        priceCents: 8999,
        imageUrl: "/products/work-boots.jpg",
        category: "Safety Gear",
        fulfillmentType: "MANUAL",
        stock: 15,
      },
      {
        name: "Anti-Fog Safety Glasses",
        description: "Impact resistant, UV protection, scratch coating",
        priceCents: 1299,
        imageUrl: "/products/safety-glasses.jpg",
        category: "Safety Gear",
        fulfillmentType: "MANUAL",
        stock: 120,
      },
      {
        name: "Hi-Vis Safety Vest",
        description: "Class 2 reflective vest with multiple pockets",
        priceCents: 1699,
        imageUrl: "/products/hi-vis-vest.jpg",
        category: "Safety Gear",
        fulfillmentType: "MANUAL",
        stock: 75,
      },

      // ---------- Power Tools (dropship) ----------
      {
        name: "Cordless Drill 20V",
        description: "Brushless motor, 2 batteries and charger",
        priceCents: 12999,
        imageUrl: "/products/cordless-drill.jpg",
        category: "Power Tools",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "DRL-20V",
      },
      {
        name: "Circular Saw 7-1/4 in",
        description: "15 amp motor, 56 degree bevel, laser guide",
        priceCents: 14999,
        imageUrl: "/products/circular-saw.jpg",
        category: "Power Tools",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "SAW-725",
      },
      {
        name: "Angle Grinder 4-1/2 in",
        description: "11 amp, paddle switch, adjustable guard",
        priceCents: 8999,
        imageUrl: "/products/angle-grinder.jpg",
        category: "Power Tools",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "GRD-450",
      },

      // ---------- Hand Tools (in stock) ----------
      {
        name: "Framing Hammer 22 oz",
        description: "Milled face, steel handle, shock-absorbing grip",
        priceCents: 3499,
        imageUrl: "/products/framing-hammer.jpg",
        category: "Hand Tools",
        fulfillmentType: "MANUAL",
        stock: 30,
      },
      {
        name: "Adjustable Wrench Set (3 pc)",
        description: "Chrome vanadium steel in 6, 10 and 12 inch sizes",
        priceCents: 4299,
        imageUrl: "/products/wrench-set.jpg",
        category: "Hand Tools",
        fulfillmentType: "MANUAL",
        stock: 25,
      },

      // ---------- Measuring ----------
      {
        name: "Laser Level Kit",
        description: "Self-leveling cross line, tripod included",
        priceCents: 7999,
        imageUrl: "/products/laser-level.jpg",
        category: "Measuring",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "LSR-100",
      },
      {
        name: "Tape Measure 25 ft",
        description: "Magnetic hook, 10 ft standout, impact resistant case",
        priceCents: 1999,
        imageUrl: "/products/tape-measure.jpg",
        category: "Measuring",
        fulfillmentType: "MANUAL",
        stock: 60,
      },

      // ---------- Electrical (dropship) ----------
      {
        name: "Extension Cord 100 ft",
        description: "12 gauge outdoor rated, lighted end",
        priceCents: 6499,
        imageUrl: "/products/extension-cord.jpg",
        category: "Electrical",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "EXT-100",
      },
      {
        name: "LED Work Light 5000 Lumen",
        description: "Rechargeable, tripod stand, water resistant",
        priceCents: 5499,
        imageUrl: "/products/led-work-light.jpg",
        category: "Electrical",
        fulfillmentType: "DROPSHIP",
        supplierId: supplier.id,
        supplierSku: "LED-5K",
      },

      // ---------- Site Equipment (in stock) ----------
      {
        name: "Traffic Cones 28 in (5 pack)",
        description: "Reflective collars, weighted base",
        priceCents: 5999,
        imageUrl: "/products/traffic-cones.jpg",
        category: "Site Equipment",
        fulfillmentType: "MANUAL",
        stock: 20,
      },
      {
        name: "Caution Barrier Tape (3 rolls)",
        description: "1000 ft per roll, tear resistant",
        priceCents: 1499,
        imageUrl: "/products/barrier-tape.jpg",
        category: "Site Equipment",
        fulfillmentType: "MANUAL",
        stock: 90,
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