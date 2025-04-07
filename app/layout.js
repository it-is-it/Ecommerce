import "./globals.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import TopNav from "@/components/TopNav";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Nextecom",
  description: "Ecommerce app using next js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
