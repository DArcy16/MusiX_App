/** @format */

import { AppContextProvider } from "@/lib/context";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AppContextProvider>
        <Toaster />
        <Component {...pageProps} />
      </AppContextProvider>
    </UserProvider>
  );
}
