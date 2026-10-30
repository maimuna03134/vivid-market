import { z } from "zod";

export const VARIANT_ATTRIBUTES = ["Size", "Color", "Material"];

export const productSchema = z.object({
    name: z.string().trim().min(3, "Enter a product name (at least 3 characters)"),
    description: z.string().trim().min(20, "Write at least 20 characters describing the product"),
    category: z.string().min(1, "Select a category"),
    sku: z
        .string()
        .trim()
        .min(3, "Enter a SKU")
        .regex(/^[A-Za-z0-9-]+$/, "Use only letters, numbers and hyphens"),
    // preprocess handles both a typed string ("99") and an untouched numeric default value
    // (159.99) the same way, and treats a truly empty field as missing rather than silently 0
    price: z.preprocess(
        (v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
        z.number({ invalid_type_error: "Enter a price", required_error: "Enter a price" }).positive("Price must be greater than 0")
    ),
    stock: z.preprocess(
        (v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
        z
            .number({ invalid_type_error: "Enter a stock quantity", required_error: "Enter a stock quantity" })
            .int("Stock must be a whole number")
            .min(0, "Stock can't be negative")
    ),
    tags: z.string().trim().optional(),
    featured: z.boolean().optional(),
    bulkDiscount: z.boolean().optional()
});

// values (from the form) + images + variants -> the object saved to the store
export function buildProductPayload(values, images, variants, status) {
    return {
        name: values.name.trim(),
        description: (values.description || "").trim(),
        category: values.category,
        sku: values.sku.trim().toUpperCase(),
        price: Number(values.price) || 0,
        stock: Number(values.stock) || 0,
        tags: values.tags
            ? values.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
        featured: !!values.featured,
        bulkDiscount: !!values.bulkDiscount,
        image: images[0] || null,
        images,
        variants: variants.filter((v) => v.values.trim()),
        status
    };
}