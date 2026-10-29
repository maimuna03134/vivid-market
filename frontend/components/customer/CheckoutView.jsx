"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/components/ui/Icon";
import CheckoutStepper from "@/components/customer/CheckoutStepper";
import CheckoutSummary from "@/components/customer/CheckoutSummary";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { calcTotals } from "@/lib/cart";
import { checkoutSchema, CITIES, PAYMENT_METHODS } from "@/lib/checkout";
import { toast } from "@/lib/toast";

const FORM_ID = "checkout-form";

const inputBase =
    "w-full px-4 rounded border bg-surface-bright focus:ring-2 focus:ring-primary-container focus:border-primary transition-all text-body-md outline-none";
const fieldClass = (hasError) => `${inputBase} ${hasError ? "border-error" : "border-outline-variant"}`;

function Field({ id, label, error, className = "", children }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-label-md mb-stack-xs text-on-secondary-fixed-variant">
                {label}
            </label>
            {children}
            {error && <p className="text-label-md text-error mt-1">{error}</p>}
        </div>
    );
}

export default function CheckoutView() {
    const items = useCartStore((s) => s.items);
    const coupon = useCartStore((s) => s.coupon);
    const clearCart = useCartStore((s) => s.clearCart);
    const addOrder = useOrderStore((s) => s.addOrder);

    const [mounted, setMounted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [placedOrder, setPlacedOrder] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
        defaultValues: { fullName: "", phone: "", address: "", city: "", area: "", payment: "card" }
    });

    // the cart lives in localStorage, so wait for the browser before showing the page
    useEffect(() => setMounted(true), []);

    const payment = watch("payment");
    const selectedMethod = PAYMENT_METHODS.find((m) => m.value === payment);
    const step = isValid ? 3 : 1;

    async function onSubmit(data) {
        setSubmitting(true);

        // TODO (backend): POST /api/orders to create the order. For "card" and "bkash", then call
        // POST /api/payment/initiate and redirect the browser to the gateway URL it returns.
        // For now we simulate a short network delay and save the order in the browser.
        await new Promise((resolve) => setTimeout(resolve, 800));

        const order = {
            id: `VM-${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`,
            createdAt: new Date().toISOString(),
            status: "placed",
            paymentMethod: data.payment,
            paymentStatus: "pending",
            shipping: {
                fullName: data.fullName.trim(),
                phone: data.phone.trim(),
                address: data.address.trim(),
                city: data.city,
                area: data.area.trim()
            },
            items: items.map(({ id, productId, name, variant, price, qty, image }) => ({
                id,
                productId,
                name,
                variant,
                price,
                qty,
                image
            })),
            coupon: coupon ? coupon.code : null,
            totals: calcTotals(items, coupon)
        };

        addOrder(order);
        setPlacedOrder(order);
        clearCart();
        setSubmitting(false);
        toast.success("Order placed successfully!");
    }

    const wrapper = "max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg";

    // 1) waiting for the browser
    if (!mounted) {
        return (
            <div className={wrapper}>
                <div className="max-w-2xl mx-auto h-16 bg-surface-container rounded-xl animate-pulse mb-stack-lg" />
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-gutter animate-pulse">
                    <div className="h-96 bg-surface-container rounded-xl" />
                    <div className="h-96 bg-surface-container rounded-xl" />
                </div>
            </div>
        );
    }

    // 2) order placed
    if (placedOrder) {
        const method = PAYMENT_METHODS.find((m) => m.value === placedOrder.paymentMethod);
        return (
            <div className={wrapper}>
                <div className="max-w-xl mx-auto text-center">
                    <div className="w-24 h-24 mx-auto mb-stack-lg bg-tertiary-fixed rounded-full flex items-center justify-center">
                        <Icon name="check_circle" filled className="text-tertiary text-[56px]" />
                    </div>
                    <h1 className="text-headline-lg text-on-background mb-stack-sm">Order placed!</h1>
                    <p className="text-body-md text-on-surface-variant mb-stack-lg">
                        Thank you, {placedOrder.shipping.fullName}. Your order{" "}
                        <span className="font-bold text-on-surface">#{placedOrder.id}</span> has been placed.
                    </p>

                    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg text-left space-y-stack-sm mb-stack-lg">
                        <div className="flex justify-between text-body-md">
                            <span className="text-on-surface-variant">Total</span>
                            <span className="font-bold text-primary">৳{placedOrder.totals.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-body-md">
                            <span className="text-on-surface-variant">Payment</span>
                            <span className="font-semibold">{method?.label}</span>
                        </div>
                        <div className="flex justify-between gap-stack-md text-body-md">
                            <span className="text-on-surface-variant flex-shrink-0">Delivering to</span>
                            <span className="font-semibold text-right">
                                {placedOrder.shipping.address}, {placedOrder.shipping.area}, {placedOrder.shipping.city}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-stack-sm justify-center">
                        <Link
                            href="/orders"
                            className="px-stack-lg h-14 inline-flex items-center justify-center bg-primary-container text-on-primary font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            View My Orders
                        </Link>
                        <Link
                            href="/products"
                            className="px-stack-lg h-14 inline-flex items-center justify-center border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 3) nothing to check out
    if (items.length === 0) {
        return (
            <div className="flex items-center justify-center py-stack-lg min-h-[60vh]">
                <div className="text-center max-w-md px-margin-desktop">
                    <div className="w-48 h-48 mx-auto mb-stack-lg bg-surface-container rounded-full flex items-center justify-center">
                        <Icon name="shopping_basket" className="text-surface-variant text-[80px]" />
                    </div>
                    <h2 className="text-headline-lg text-on-background mb-stack-sm">Your cart is empty</h2>
                    <p className="text-body-md text-on-surface-variant mb-stack-lg">
                        Add something to your cart first, then come back to check out.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-stack-lg h-14 bg-primary-container text-on-primary font-bold text-body-lg rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // 4) the checkout form
    return (
        <div className={wrapper}>
            <CheckoutStepper step={step} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-gutter items-start">
                <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-gutter">
                    {/* Shipping address */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-stack-lg">
                        <div className="flex items-center gap-stack-sm mb-stack-md border-b border-outline-variant pb-stack-sm">
                            <Icon name="location_on" filled className="text-primary" />
                            <h2 className="text-headline-sm text-on-secondary-fixed">Shipping Address</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                            <Field id="fullName" label="Full Name" error={errors.fullName?.message}>
                                <input
                                    id="fullName"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="John Doe"
                                    className={`${fieldClass(errors.fullName)} h-12`}
                                    {...register("fullName")}
                                />
                            </Field>

                            <Field id="phone" label="Phone Number" error={errors.phone?.message}>
                                <input
                                    id="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="+880 1XXX-XXXXXX"
                                    className={`${fieldClass(errors.phone)} h-12`}
                                    {...register("phone")}
                                />
                            </Field>

                            <Field id="address" label="Shipping Address" error={errors.address?.message} className="md:col-span-2">
                                <textarea
                                    id="address"
                                    rows={3}
                                    autoComplete="street-address"
                                    placeholder="House #, Street name, Apartment"
                                    className={`${fieldClass(errors.address)} py-3`}
                                    {...register("address")}
                                />
                            </Field>

                            <Field id="city" label="City" error={errors.city?.message}>
                                <select
                                    id="city"
                                    className={`${fieldClass(errors.city)} h-12 appearance-none`}
                                    {...register("city")}
                                >
                                    <option value="">Select City</option>
                                    {CITIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field id="area" label="Area" error={errors.area?.message}>
                                <input
                                    id="area"
                                    type="text"
                                    placeholder="e.g. Dhanmondi"
                                    className={`${fieldClass(errors.area)} h-12`}
                                    {...register("area")}
                                />
                            </Field>
                        </div>
                    </section>

                    {/* Payment method */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-stack-lg">
                        <div className="flex items-center gap-stack-sm mb-stack-md border-b border-outline-variant pb-stack-sm">
                            <Icon name="payments" filled className="text-primary" />
                            <h2 className="text-headline-sm text-on-secondary-fixed">Payment Method</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-sm">
                            {PAYMENT_METHODS.map((m) => (
                                <label key={m.value} className="cursor-pointer relative group">
                                    <input type="radio" value={m.value} className="sr-only peer" {...register("payment")} />
                                    <div className="border border-outline-variant rounded-xl p-stack-md flex flex-col items-center gap-stack-sm text-center transition-all hover:bg-surface-container-low group-hover:border-primary-container peer-checked:border-2 peer-checked:border-primary peer-checked:bg-primary-fixed/40 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-container">
                                        <Icon name={m.icon} className="text-secondary text-4xl" />
                                        <span className="text-label-md font-bold text-on-secondary-fixed">{m.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {selectedMethod && (
                            <p className="mt-stack-md flex items-start gap-2 text-body-sm text-on-surface-variant">
                                <Icon name="info" className="text-[18px] mt-0.5" />
                                {selectedMethod.hint}
                            </p>
                        )}
                    </section>
                </form>

                <CheckoutSummary formId={FORM_ID} submitting={submitting} />
            </div>
        </div>
    );
}