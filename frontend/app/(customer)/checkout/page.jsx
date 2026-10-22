"use client";

import api from "@/lib/api";
import { toast } from "@/lib/toast";

export default function CheckoutPage() {
  async function handlePlaceOrder(orderData) {
    await toast.promise(api.post("/orders", orderData), {
      loading: "Placing order...",
      success: "Order placed!",
      error: "Failed to place order"
    });
    // e.g. redirect to /orders after success
  }

  return (
    <div>
      Checkout
      {/* <button onClick={() => handlePlaceOrder(formData)}>Place Order</button> */}
    </div>
  );
}
