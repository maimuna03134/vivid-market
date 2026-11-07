"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

export default function ProductGallery({ images, name, discount }) {
    const [active, setActive] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    return (
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-stack-md">
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex md:flex-col gap-stack-sm overflow-x-auto md:overflow-y-auto hide-scrollbar md:max-h-[560px]">
                    {images.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setActive(i)}
                            onMouseEnter={() => setActive(i)}
                            aria-label={`View image ${i + 1}`}
                            className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-colors ${i === active
                                    ? "border-2 border-primary"
                                    : "border border-outline-variant hover:border-primary-container"
                                }`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* Main image */}
            <div className="flex-grow relative bg-white rounded-xl shadow-lg border border-outline-variant overflow-hidden h-[360px] md:h-[560px]">
                {images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={images[active]}
                        alt={name}
                        className={`w-full h-full object-contain p-8 transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"
                            }`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant">
                        <Icon name="image" className="text-[96px]" />
                    </div>
                )}

                {images.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setZoomed((v) => !v)}
                        aria-label="Zoom image"
                        className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-md text-secondary hover:scale-110 transition-transform"
                    >
                        <Icon name={zoomed ? "zoom_out" : "zoom_in"} />
                    </button>
                )}

                {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-primary-container text-white px-3 py-1 font-bold text-label-md rounded-lg shadow-sm">
                        {discount}% OFF
                    </div>
                )}
            </div>
        </div>
    );
}