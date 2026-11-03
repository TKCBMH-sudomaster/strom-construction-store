import { NextResponse } from "next/server";
import { createOrder } from "../../../lib/fulfillment";

export async function POST(req: Request) {
  try {
    const { email, cart } = await req.json();

    if (!email || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "email and a non-empty cart are required" },
        { status: 400 }
      );
    }

    const order = await createOrder(email, cart);
    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}