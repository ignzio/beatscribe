
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./globals.css";
import Navigation from "./components/Navigation";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
         <Navigation />
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
