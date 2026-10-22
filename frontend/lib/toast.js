// Thin wrapper around sonner so the rest of the app imports from one place
// (easy to swap libraries later without touching every component).
//
// Usage:
//   import { toast } from "@/lib/toast";
//   toast.success("Order placed!");
//   toast.error("Something went wrong");
//   toast.promise(api.post("/orders", data), {
//     loading: "Placing order...",
//     success: "Order placed!",
//     error: "Failed to place order"
//   });

export { toast } from "sonner";
