// Client-side auth helpers (read user info, role checks, etc.)
export function getUserRole(user) {
  return user?.role ?? null;
}
