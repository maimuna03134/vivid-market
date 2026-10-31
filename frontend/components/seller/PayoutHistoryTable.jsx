"use client";

import Icon from "@/components/ui/Icon";
import { formatPrice, formatDate } from "@/lib/format";
import { PAYOUT_STATUS, PAYOUT_METHODS } from "@/lib/payouts";

function getPages(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out = [];
  keep.forEach((p, i) => {
    if (i > 0 && p - keep[i - 1] > 1) out.push("...");
    out.push(p);
  });
  return out;
}

export default function PayoutHistoryTable({ payouts, page, totalPages, from, to, total, onPage }) {
  const pageButton =
    "p-2 rounded-lg hover:bg-outline-variant transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-6 border-b border-outline-variant">
        <h3 className="text-headline-sm text-on-surface">Payout History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container-low">
              {["Date", "Transaction ID", "Amount", "Method", "Status"].map((h) => (
                <th key={h} className="px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {payouts.map((p) => {
              const status = PAYOUT_STATUS[p.status];
              const method = PAYOUT_METHODS.find((m) => m.value === p.method);
              return (
                <tr key={p.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="px-6 py-4 text-body-sm text-on-surface-variant whitespace-nowrap">
                    {formatDate(p.date)}
                  </td>
                  <td className="px-6 py-4 text-body-sm font-mono text-on-surface">{p.transactionId}</td>
                  <td className="px-6 py-4 font-bold text-on-surface whitespace-nowrap">
                    {formatPrice(p.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant whitespace-nowrap">
                      <Icon name={method?.icon} className="text-[18px]" />
                      {method?.value === "bank" ? "Bank Transfer" : "PayPal"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-bold ${status.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-stack-sm">
        <p className="text-body-sm text-on-surface-variant">
          Showing {from}-{to} of {total} payouts
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1} className={pageButton} aria-label="Previous page">
              <Icon name="chevron_left" />
            </button>
            {getPages(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className="px-2">...</span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPage(p)}
                  className={`w-9 h-9 rounded-lg font-bold transition-colors ${p === page ? "bg-primary-container text-on-primary-container" : "hover:bg-outline-variant"
                    }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => onPage(page + 1)}
              disabled={page === totalPages}
              className={pageButton}
              aria-label="Next page"
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}