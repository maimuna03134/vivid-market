import Link from "next/link";
import { shopCategories } from "@/constants/mockData";

export default function CategoryGrid() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg">
      <h2 className="text-headline-lg text-on-secondary-fixed mb-stack-md">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
        {shopCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="group relative h-64 rounded-xl overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${cat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/80 to-transparent flex items-end p-6">
              <span className="text-white text-headline-sm">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}