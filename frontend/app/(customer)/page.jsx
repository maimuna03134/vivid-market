import CategoryBar from "@/components/customer/CategoryBar";
import HeroBanner from "@/components/customer/HeroBanner";
import FlashSaleSection from "@/components/customer/FlashSaleSection";
import CategoryGrid from "@/components/customer/CategoryGrid";
import ProductCard from "@/components/shared/ProductCard";
import { featuredProducts } from "@/constants/mockData";

export default function CustomerHomePage() {
  return (
    <>
      <CategoryBar />
      <HeroBanner />
      <FlashSaleSection />
      <CategoryGrid />

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg">
        <h2 className="text-headline-lg text-on-secondary-fixed mb-stack-md">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}