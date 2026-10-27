import Icon from "@/components/ui/Icon";

// Renders 5 stars with half-star support (rating is rounded down to the nearest 0.5)
// Usage: <Stars rating={4.8} /> or <Stars rating={5} iconClassName="text-[18px]" />
export default function Stars({ rating = 0, iconClassName = "", className = "" }) {
    const value = Math.floor(rating * 2) / 2;
    return (
        <div className={`flex text-yellow-500 ${className}`}>
            {[1, 2, 3, 4, 5].map((n) => {
                if (value >= n) return <Icon key={n} name="star" filled className={iconClassName} />;
                if (value >= n - 0.5) return <Icon key={n} name="star_half" filled className={iconClassName} />;
                return <Icon key={n} name="star" className={iconClassName} />;
            })}
        </div>
    );
}