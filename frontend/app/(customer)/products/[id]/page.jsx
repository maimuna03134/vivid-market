import { notFound } from "next/navigation";
import ProductGallery from "@/components/customer/ProductGallery";
import ProductInfo from "@/components/customer/ProductInfo";
import ProductTabs from "@/components/customer/ProductTabs";
import RecommendedProducts from "@/components/customer/RecommendedProducts";
import { getProductById, getRecommended } from "@/lib/ProductDetails";

// Next.js 16: params is a Promise
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product ? `${product.title} | Vivid Market` : "Product not found | Vivid Market" };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const recommended = getRecommended(id);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <ProductGallery images={product.images} name={product.title} discount={product.discount} />
        <ProductInfo product={product} />
      </section>

      <ProductTabs product={product} />
      <RecommendedProducts products={recommended} />
    </div>
  );
}