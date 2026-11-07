// Temporary mock data for the seller payouts page (replace with API calls once the backend is ready)

export const availableBalance = 4250.8;
export const nextPayoutDate = "2026-11-05T00:00:00";

const entries = [
    ["2026-10-28T10:45:00", "TXN-99210-VP", 1280.5, "bank", "paid"],
    ["2026-10-26T14:12:00", "TXN-99185-VP", 2450.0, "bank", "pending"],
    ["2026-10-24T09:30:00", "TXN-99150-VP", 920.0, "paypal", "approved"],
    ["2026-10-20T16:55:00", "TXN-99112-VP", 3100.75, "bank", "paid"],
    ["2026-10-15T11:20:00", "TXN-99088-VP", 540.25, "paypal", "paid"],
    ["2026-10-10T08:05:00", "TXN-99040-VP", 1875.0, "bank", "paid"],
    ["2026-10-04T13:40:00", "TXN-98990-VP", 690.5, "bank", "paid"],
    ["2026-09-28T15:15:00", "TXN-98930-VP", 2200.0, "paypal", "paid"],
    ["2026-09-20T10:00:00", "TXN-98870-VP", 1340.6, "bank", "paid"],
    ["2026-09-12T09:50:00", "TXN-98810-VP", 980.0, "bank", "paid"],
    ["2026-09-03T12:30:00", "TXN-98750-VP", 1620.4, "paypal", "paid"],
    ["2026-08-25T14:05:00", "TXN-98690-VP", 760.0, "bank", "paid"]
];

export const mockPayouts = entries.map(([date, id, amount, method, status], i) => ({
    id: `po-${i + 1}`,
    date,
    transactionId: id,
    amount,
    method,
    status
}));