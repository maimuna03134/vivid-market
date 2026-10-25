import Link from "next/link";
import Icon from "@/components/ui/Icon";

const quickLinks = ["About Us", "Sell on Vivid Market", "Contact Support", "Privacy Policy", "Terms of Service"];
const serviceLinks = ["My Account", "Order Tracking", "Shipping Rates", "Returns & Refunds", "FAQ"];

export default function Footer() {
  return (
    <footer className="bg-on-secondary-fixed text-white pt-stack-lg border-t border-secondary">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter pb-stack-lg">
        <div className="space-y-6">
          <div className="text-headline-sm font-bold text-white">Vivid Market</div>
          <p className="text-secondary-fixed-dim text-body-sm leading-relaxed">
            Your one-stop destination for high-velocity shopping. Quality products,
            lightning-fast delivery.
          </p>
          <div className="flex gap-4">
            <Icon name="face_nod" className="cursor-pointer hover:text-primary-container transition-colors" />
            <Icon name="alternate_email" className="cursor-pointer hover:text-primary-container transition-colors" />
            <Icon name="share" className="cursor-pointer hover:text-primary-container transition-colors" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg uppercase tracking-wider text-primary-fixed">Quick Links</h4>
          <ul className="space-y-2 text-secondary-fixed-dim text-body-sm">
            {quickLinks.map((label) => (
              <li key={label}>
                <Link href="#" className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg uppercase tracking-wider text-primary-fixed">Customer Service</h4>
          <ul className="space-y-2 text-secondary-fixed-dim text-body-sm">
            {serviceLinks.map((label) => (
              <li key={label}>
                <Link href="#" className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-lg uppercase tracking-wider text-primary-fixed">Newsletter</h4>
          <p className="text-secondary-fixed-dim text-body-sm">
            Get the latest updates and flash sale alerts.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-secondary text-white border-none rounded p-3 focus:ring-2 focus:ring-primary-container placeholder:text-secondary-fixed-dim"
            />
            <button className="bg-primary-container text-on-primary-container font-bold py-3 rounded uppercase tracking-widest hover:opacity-90">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 py-6 border-t border-secondary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-fixed-dim text-body-sm">
            © {new Date().getFullYear()} Vivid Market. All rights reserved.
          </p>
          <div className="flex items-center gap-4 grayscale opacity-70">
            <Icon name="credit_card" className="text-[32px]" />
            <Icon name="payments" className="text-[32px]" />
            <Icon name="account_balance_wallet" className="text-[32px]" />
            <Icon name="savings" className="text-[32px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}