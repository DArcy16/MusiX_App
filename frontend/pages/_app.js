/** @format */

import { AppContextProvider } from "@/lib/context";
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </UserProvider>
  );
}
