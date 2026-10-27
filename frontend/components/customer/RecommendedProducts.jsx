import Link from "next/link";
import Icon from "@/components/ui/Icon";

function formatCount(n) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function RecommendedProducts({ products }) {
    if (!products.length) return null;

    return (
        <section className="mt-stack-lg border-t border-outline-variant pt-stack-lg">
            <h2 className="text-headline-lg-mobile md:text-headline-md font-bold mb-stack-md">You may also like</h2>
            <div className="flex gap-gutter overflow-x-auto hide-scrollbar pb-stack-md">
                {products.map((p) => (
                    <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        className="min-w-[280px] bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden group hover:-translate-y-1 transition-transform"
                    >
                        <div className="h-48 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                            />
                            {p.badge && (
                                <div className="absolute top-2 right-2 bg-primary-container text-white text-label-md px-2 py-1 font-bold rounded">
                                    {p.badge}
                                </div>
                            )}
                        </div>
                        <div className="p-stack-md space-y-stack-xs">
                            <div className="font-bold text-body-md line-clamp-2">{p.name}</div>
                            <div className="text-primary font-bold text-body-lg">${p.price.toFixed(2)}</div>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Icon name="star" filled className="text-label-md" />
                                <span className="text-label-md text-on-surface-variant font-normal">
                                    {p.rating.toFixed(1)} ({formatCount(p.reviews)})
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}