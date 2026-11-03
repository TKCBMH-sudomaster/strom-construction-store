import { Prisma } from "@prisma/client";
import { prisma } from "./db";

type CartLine = { productId: string; quantity: number };

type OrderItemInput = {
  productId: string;
  quantity: number;
  fulfillment: string;
  status: string;
};

export async function createOrder(email: string, cart: CartLine[]) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const products = await tx.product.findMany({
      where: { id: { in: cart.map((c) => c.productId) } },
    });

    let total = 0;
    const items: OrderItemInput[] = [];

    for (const line of cart) {
      const product = products.find(
        (p: (typeof products)[number]) => p.id === line.productId
      );
      if (!product) throw new Error("Product not found");

      total += product.priceCents * line.quantity;

      if (product.fulfillmentType === "MANUAL") {
        // Manual: check and reduce our own stock, queue for packing
        if (product.stock < line.quantity) {
          throw new Error(`${product.name} is out of stock`);
        }
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: line.quantity } },
        });
        items.push({
          productId: product.id,
          quantity: line.quantity,
          fulfillment: "MANUAL",
          status: "AWAITING_PACKING",
        });
      } else {
        // Dropship: leave pending for the automation worker (Part 2)
        items.push({
          productId: product.id,
          quantity: line.quantity,
          fulfillment: "DROPSHIP",
          status: "PENDING",
        });
      }
    }

    return tx.order.create({
      data: {
        customerEmail: email,
        totalCents: total,
        items: { create: items },
      },
      include: { items: true },
    });
  });
}