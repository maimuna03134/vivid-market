import Icon from "@/components/ui/Icon";

// Generic stat card used by seller/admin dashboards.
// trend = { value: "+12%", positive: true } (optional — omit for cards with no trend)
export default function StatCard({ icon, iconBg, iconColor, label, value, trend }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-[0px_4px_20px_rgba(26,26,46,0.08)] hover:-translate-y-1 transition-transform group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg transition-colors ${iconBg} ${iconColor}`}>
          <Icon name={icon} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-label-md font-bold ${trend.positive ? "text-[#2ECC71]" : "text-error"
              }`}
          >
            <Icon name={trend.positive ? "trending_up" : "trending_down"} className="text-[14px]" />
            {trend.value}
          </div>
        )}
      </div>
      <p className="text-on-surface-variant text-label-md mb-1 uppercase tracking-wider">{label}</p>
      <h3 className="text-price-lg text-on-surface">{value}</h3>
    </div>
  );
}