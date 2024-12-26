"use client";
import { liff, type Liff } from "@line/liff";
import LiffMockPlugin from "@line/liff-mock";
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
    console.log("LIFF init...");
    liff.use(new LiffMockPlugin());
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID!, mock: true })
      .then(() => {
        console.log("LIFF init succeeded.");
        if (!liff.isInClient()) liff.login();
        liff.$mock.set((p) => ({
          ...p,
          getProfile: {
            displayName: "Test User",
            userId: "U846856f0da9cfd54706db8cb5dabd17a",
            pictureUrl:
              "https://cdn3.iconfinder.com/data/icons/leto-user-group/64/__user_person_profile-256.png ",
          },
        }));
        setLiffObject(liff);
      })
      .catch((error: Error) => {
        console.log("LIFF init failed.", error);
        setLiffError(error.toString());
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
