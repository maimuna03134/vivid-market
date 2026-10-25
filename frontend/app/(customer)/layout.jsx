import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MobileBottomNav from "@/components/shared/MobileBottomNav";

// Navbar + Footer wrapper for all customer pages
export default function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mt-[72px] pb-24 md:pb-stack-lg min-h-[calc(100vh-72px)]">{children}</main>
      <div className="pb-16 md:pb-0 bg-on-secondary-fixed">
        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
}