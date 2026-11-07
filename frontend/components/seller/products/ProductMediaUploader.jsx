"use client";

import { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { toast } from "@/lib/toast";

const MAX_IMAGES = 5;

// images = array of data-URL strings, onChange(nextArray)
export default function ProductMediaUploader({ images, onChange }) {
    const inputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    function addFiles(fileList) {
        const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
        const room = MAX_IMAGES - images.length;
        if (files.length > room) {
            toast.error(`You can upload up to ${MAX_IMAGES} images`);
        }
        const toRead = files.slice(0, Math.max(0, room));
        toRead.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => onChange((prev) => [...prev, reader.result]);
            reader.readAsDataURL(file);
        });
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
    }

    function removeAt(index) {
        onChange((prev) => prev.filter((_, i) => i !== index));
    }

    const placeholders = Math.max(0, MAX_IMAGES - images.length);

    return (
        <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-headline-sm mb-6 text-on-surface">Product Media</h3>

            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${dragOver ? "border-primary-container bg-primary-fixed/30" : "border-outline-variant"
                    }`}
            >
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center">
                    <Icon name="cloud_upload" className="text-primary text-3xl" />
                </div>
                <div className="text-center">
                    <p className="text-body-md font-bold">Drag &amp; drop files here</p>
                    <p className="text-body-sm text-on-surface-variant mt-1">
                        Supported formats: JPG, PNG, WEBP (Max 5MB)
                    </p>
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                    }}
                    className="px-6 py-2 bg-on-secondary-fixed text-white font-bold rounded hover:opacity-90 active:scale-95 transition-all"
                >
                    Browse Files
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                        if (e.target.files?.length) addFiles(e.target.files);
                        e.target.value = "";
                    }}
                />
            </div>

            <div className="mt-6">
                <p className="text-label-md text-on-surface-variant mb-3 uppercase">
                    Uploaded Images ({images.length}/{MAX_IMAGES})
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {images.map((src, i) => (
                        <div key={i} className="aspect-square rounded border border-outline-variant overflow-hidden group relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeAt(i)}
                                aria-label={`Remove image ${i + 1}`}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Icon name="close" className="text-white text-lg" />
                            </button>
                        </div>
                    ))}
                    {Array.from({ length: placeholders }).map((_, i) => (
                        <button
                            type="button"
                            key={`ph-${i}`}
                            onClick={() => inputRef.current?.click()}
                            className="aspect-square rounded border-2 border-dashed border-outline-variant bg-surface flex items-center justify-center hover:border-primary-container transition-colors"
                        >
                            <Icon name="add" className="text-outline-variant" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}