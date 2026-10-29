import SellerShell from "@/components/seller/SellerShell";

// seller sidebar + topbar wrapper
export default function SellerLayout({ children }) {
  return <SellerShell>{children}</SellerShell>;
}