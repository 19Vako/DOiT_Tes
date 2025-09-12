"use client";

import { ColorModeProvider } from "./Theme/theme";
import { Layout } from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ColorModeProvider>
            <Layout>{children}</Layout>
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  );
}
