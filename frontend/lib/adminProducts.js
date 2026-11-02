// Logic for the admin product approval queue (no styling here, so it can be reused anywhere)

export function pendingProducts(products) {
    return products.filter((p) => p.status === "pending");
}

export function sortByDate(products, order = "newest") {
    const withDate = products.map((p) => ({ ...p, _date: new Date(p.submittedAt || 0).getTime() }));
    withDate.sort((a, b) => (order === "newest" ? b._date - a._date : a._date - b._date));
    return withDate.map(({ _date, ...p }) => p);
}