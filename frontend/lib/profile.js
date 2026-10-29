import { z } from "zod";
import { CITIES } from "@/lib/checkout";

const isValidPhone = (value) => /^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ""));

export const profileSchema = z.object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z.string().trim().refine(isValidPhone, "Enter a valid mobile number, e.g. 01712-345678")
});

export const ADDRESS_TYPES = [
    { value: "home", label: "Home", icon: "home" },
    { value: "office", label: "Office", icon: "work" },
    { value: "other", label: "Other", icon: "location_on" }
];

export const addressSchema = z.object({
    type: z.enum(["home", "office", "other"]),
    line1: z.string().trim().min(5, "Enter the street address"),
    line2: z.string().trim().optional(),
    city: z.string().min(1, "Select a city"),
    postalCode: z
        .string()
        .trim()
        .optional()
        .refine((v) => !v || /^\d{4}$/.test(v), "Postal code must be 4 digits")
});

export { CITIES };