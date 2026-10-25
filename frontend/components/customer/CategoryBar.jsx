import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { categoryShortcuts } from "@/constants/mockData";

export default function CategoryBar() {
    return (
        <section className="bg-white py-stack-md shadow-sm border-b border-outline-variant">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="flex justify-between items-center overflow-x-auto hide-scrollbar gap-8">
                    {categoryShortcuts.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.slug ? `/products?category=${cat.slug}` : "/products"}
                            className="flex flex-col items-center gap-2 min-w-[80px] group"
                        >
                            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
                                <Icon name={cat.icon} className="text-primary text-[32px]" />
                            </div>
                            <span className="text-label-md text-secondary">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}