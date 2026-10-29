"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/profile";
import { toast } from "@/lib/toast";

const inputClass =
    "w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-4 text-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all";

export default function ProfileInfoForm({ profile, onSave }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: profile.fullName,
            email: profile.email,
            phone: profile.phone
        }
    });

    async function onSubmit(data) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        onSave({
            fullName: data.fullName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim()
        });
        toast.success("Profile updated");
    }

    return (
        <div id="profile-info" className="bg-white p-stack-lg rounded-lg shadow-sm border border-outline-variant scroll-mt-24">
            <div className="flex justify-between items-center mb-stack-lg border-b border-outline-variant pb-stack-sm">
                <h2 className="text-headline-sm text-on-secondary-fixed">Profile Information</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-stack-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="space-y-stack-xs">
                        <label htmlFor="fullName" className="text-label-md text-on-secondary-fixed-variant">
                            Full Name
                        </label>
                        <input id="fullName" type="text" className={inputClass} {...register("fullName")} />
                        {errors.fullName && <p className="text-label-md text-error">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-stack-xs">
                        <label htmlFor="email" className="text-label-md text-on-secondary-fixed-variant">
                            Email Address
                        </label>
                        <input id="email" type="email" className={inputClass} {...register("email")} />
                        {errors.email && <p className="text-label-md text-error">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-stack-xs md:col-span-2">
                        <label htmlFor="phone" className="text-label-md text-on-secondary-fixed-variant">
                            Phone Number
                        </label>
                        <input id="phone" type="tel" className={inputClass} {...register("phone")} />
                        {errors.phone && <p className="text-label-md text-error">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="pt-stack-md">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary-container text-white px-8 py-3 rounded-lg font-bold text-label-md hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-md disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}