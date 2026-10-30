import { Suspense } from "react";
import ProductForm from "@/components/seller/ProductForm";

export const metadata = { title: "Add Product | Vivid Market" };

export default function AddProductPage() {
  return (
    <Suspense fallback={<div className="h-96 bg-surface-container rounded-xl animate-pulse" />}>
      <ProductForm />
    </Suspense>
  );
}