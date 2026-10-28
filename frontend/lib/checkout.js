import { z } from "zod";

export const CITIES = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh"
];

export const PAYMENT_METHODS = [
    {
        value: "card",
        label: "Credit/Debit Card",
        icon: "credit_card",
        hint: "You will be taken to a secure payment page to enter your card details."
    },
    {
        value: "bkash",
        label: "bKash",
        icon: "account_balance_wallet",
        hint: "You will be taken to a secure payment page to pay with your bKash account."
    },
    {
        value: "cod",
        label: "Cash on Delivery",
        icon: "local_shipping",
        hint: "Pay in cash when your order arrives at your door."
    }
];

// Bangladeshi mobile number: 01XXXXXXXXX, with optional +88 / 88 prefix, spaces and hyphens allowed
const isValidPhone = (value) => /^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ""));

export const checkoutSchema = z.object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    phone: z.string().trim().refine(isValidPhone, "Enter a valid mobile number, e.g. 01712-345678"),
    address: z.string().trim().min(8, "Enter your full shipping address"),
    city: z.string().min(1, "Select a city"),
    area: z.string().trim().min(2, "Enter your area"),
    payment: z.enum(["card", "bkash", "cod"])
});