import { Toaster } from "sonner";

export const metadata = {
  title: "Vivid Market",
  description: "Full-stack role-based e-commerce marketplace"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
