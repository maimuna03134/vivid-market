"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Stars from "@/components/ui/Stars";
import { toast } from "@/lib/toast";

const avatarStyles = [
  "bg-secondary-fixed text-secondary",
  "bg-primary-fixed text-primary",
  "bg-tertiary-fixed text-tertiary",
  "bg-surface-container-high text-on-surface-variant"
];

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReviewCard({ review, index = 0 }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  function toggleHelpful() {
    setHelpful((n) => (voted ? n - 1 : n + 1));
    setVoted((v) => !v);
  }

  return (
    <div className="bg-white p-stack-md rounded-xl shadow-sm border border-outline-variant">
      <div className="flex justify-between items-start mb-stack-sm">
        <div className="flex items-center gap-stack-sm">
          <div
            className={`w-10 h-10 rounded-full font-bold flex items-center justify-center ${avatarStyles[index % avatarStyles.length]
              }`}
          >
            {initials(review.name)}
          </div>
          <div>
            <div className="font-bold text-body-md">{review.name}</div>
            <div className="text-label-md text-on-surface-variant italic">Verified Purchase</div>
          </div>
        </div>
        <Stars rating={review.rating} iconClassName="text-[18px]" />
      </div>

      <p className="text-body-md text-on-surface-variant leading-relaxed">{review.text}</p>

      <div className="mt-stack-md flex gap-stack-md">
        <button
          type="button"
          onClick={toggleHelpful}
          className={`flex items-center gap-stack-xs text-label-md hover:text-primary ${voted ? "text-primary" : "text-on-surface-variant"
            }`}
        >
          <Icon name="thumb_up" filled={voted} className="text-body-md" /> Helpful ({helpful})
        </button>
        <button
          type="button"
          onClick={() => toast.info("Please login to comment")}
          className="flex items-center gap-stack-xs text-label-md text-on-surface-variant hover:text-primary"
        >
          <Icon name="chat_bubble" className="text-body-md" /> Comment
        </button>
      </div>
    </div>
  );
}