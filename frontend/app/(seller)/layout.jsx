import SellerShell from "@/components/seller/layout/SellerShell";

// seller sidebar + topbar wrapper
export default function SellerLayout({ children }) {
  return <SellerShell>{children}</SellerShell>;
}