import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { HERO_IMAGE } from "@/constants/mockData";

export default function HeroBanner() {
  return (
    <section className="w-full relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-on-secondary-fixed">
        <div className="absolute inset-0 flex items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop z-10">
          <div className="max-w-xl text-white space-y-6">
            <div className="inline-block bg-primary-container text-on-primary-container px-4 py-1 font-bold text-sm tracking-wider uppercase rounded">
              Seasonal Event
            </div>
            <h1 className="text-headline-lg-mobile md:text-display-lg leading-tight">
              Energetic Sale: Up to 60% OFF
            </h1>
            <p className="text-body-lg opacity-90">
              Discover the latest tech and summer fashion trends. High-velocity savings
              start now for a limited time only.
            </p>
            <Link
              href="/products"
              className="bg-primary-container text-on-primary-container font-bold px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg"
            >
              Shop Now <Icon name="arrow_forward" />
            </Link>
          </div>
        </div>

        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Headphones and smartwatch"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}