/* eslint-disable react/no-children-prop */
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "@/components/App/App";

export const metadata: Metadata = {
  title: {
    default: "TIG OTC",
    template: "%s - TIG OTC",
  },
  description: "A safe and open-source peer-to-peer platform to trade your TIGs",

  twitter: {
    card: "summary_large_image",
    site: "@tigotc",
    title: "TIG OTC",
    description: "A safe and open-source peer-to-peer platform to trade your TIGs",
    images: "https://res.cloudinary.com/e-tech-test/image/upload/v1723302232/tig-otc-main_qgksb8.png",
  },
  openGraph: {
    type: "website",
    url: "https://tig-otc.com/",
    locale: "en_US",
    title: "TIG OTC",
    images: "https://res.cloudinary.com/e-tech-test/image/upload/v1723302232/tig-otc-main_qgksb8.png",
    description: "A safe and open-source peer-to-peer platform to trade your TIGs",
    siteName: "TIG OTC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" scaling="90%" accentColor="amber" style={{ minHeight: "initial" }}>
          <App children={children} />
        </Theme>
      </body>
    </html>
  );
}
