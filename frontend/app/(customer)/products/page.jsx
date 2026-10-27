import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ProductFilters from "@/components/customer/ProductFilters";
import ProductSort from "@/components/customer/ProductSort";
import ProductListCard from "@/components/customer/ProductListCard";
import Pagination from "@/components/customer/Pagination";
import { parseFilters } from "@/lib/productQuery";
import { getProducts } from "@/lib/products";
import { categoryOptions } from "@/constants/mockProducts";

export const metadata = { title: "Products | Vivid Market" };

export default async function ProductListingPage({ searchParams }) {
  // Next.js 16: searchParams is a Promise
  const filters = parseFilters(await searchParams);
  const { items, total, page, totalPages, from, to } = getProducts(filters);

  // breadcrumb label
  let crumb = "All Products";
  if (filters.search) {
    crumb = `Results for "${filters.search}"`;
  } else if (filters.category.length === 1) {
    const slug = filters.category[0];
    crumb =
      categoryOptions.find((c) => c.slug === slug)?.name ||
      slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
  }

  return (
    <div className="px-4 md:px-8 max-w-container-max mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-on-surface-variant text-label-md">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Icon name="chevron_right" className="text-[14px]" />
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        {crumb !== "All Products" && (
          <>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="text-on-surface font-bold">{crumb}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col md:flex-row gap-gutter">
        <ProductFilters filters={filters} />

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-on-surface-variant text-body-md">
              {total === 0 ? (
                "No results found"
              ) : (
                <>
                  Showing <span className="font-bold text-on-surface">{from}-{to}</span> of {total} results
                </>
              )}
            </p>
            <ProductSort filters={filters} />
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
              {items.map((product) => (
                <ProductListCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-outline-variant rounded-xl">
              <Icon name="search_off" className="text-[64px] text-outline-variant" />
              <h3 className="text-headline-sm text-on-secondary-fixed mt-4">No products found</h3>
              <p className="text-on-surface-variant mt-1">Try changing or clearing your filters.</p>
              <Link
                href="/products"
                className="mt-6 bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-lg hover:opacity-90"
              >
                Clear all filters
              </Link>
            </div>
          )}

          <Pagination filters={filters} page={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}