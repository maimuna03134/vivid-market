"use client";

import Icon from "@/components/ui/Icon";
import { ADDRESS_TYPES } from "@/lib/profile";

const typeColor = { home: "text-primary", office: "text-secondary", other: "text-tertiary" };

export default function AddressCard({ address, onEdit, onDelete }) {
    const type = ADDRESS_TYPES.find((t) => t.value === address.type) || ADDRESS_TYPES[2];

    return (
        <div className="group border border-outline-variant p-stack-md rounded-lg hover:border-primary-container hover:shadow-md transition-all relative">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-stack-sm">
                    <Icon name={type.icon} className={`text-[20px] ${typeColor[address.type]}`} />
                    <span className={`font-bold text-label-md uppercase tracking-wider ${typeColor[address.type]}`}>
                        {type.label}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onEdit}
                        title="Edit"
                        className="p-1.5 text-on-secondary-fixed-variant hover:text-primary transition-colors bg-surface-container-high rounded"
                    >
                        <Icon name="edit" className="text-[18px]" />
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        title="Delete"
                        className="p-1.5 text-on-secondary-fixed-variant hover:text-error transition-colors bg-surface-container-high rounded"
                    >
                        <Icon name="delete" className="text-[18px]" />
                    </button>
                </div>
            </div>
            <p className="text-body-md text-on-secondary-fixed font-semibold">{address.line1}</p>
            {address.line2 && <p className="text-body-sm text-on-secondary-fixed-variant">{address.line2}</p>}
            <p className="text-body-sm text-on-secondary-fixed-variant">
                {address.city}
                {address.postalCode ? `, ${address.postalCode}` : ""}
            </p>
        </div>
    );
}