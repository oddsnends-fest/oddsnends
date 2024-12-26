"use client";
import type { Liff } from "@line/liff";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";

interface LiffContextProps {
  liff: Liff | null;
  liffError: string | null;
}

const LiffContext = createContext<LiffContextProps>({
  liff: null,
  liffError: null,
});

export default function Layout({ children }: { children: ReactNode }) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    void import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  return (
    <LiffContext.Provider
      value={{
        liff: liffObject,
        liffError,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
}

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (context === undefined) {
    throw new Error("useLiff must be used within a LiffProvider");
  }
  return context;
};
