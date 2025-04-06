"use client";
import { env } from "@/env";
import { liff, type Liff } from "@line/liff";
import { useState, useEffect, createContext, useContext, type ReactNode } from "react";

interface LiffContextProps {
  liff: Liff | null;
  liffError: string | null;
}

interface JWTPayload {
  sub: string;  // ID issued by mongoose
  role: string; // Your new information that is causing error
  iat: number;
  exp: number;
}

const LiffContext = createContext<LiffContextProps>({
  liff: null,
  liffError: null,
});

export default function Layout({ children }: { children: ReactNode }) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [token, setToken] = useState<JWTPayload | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: env.NEXT_PUBLIC_LIFF_ID });

        setLiffObject(liff);

        liff.ready.then(() => {
          if(!liff.isLoggedIn() && !liff.isInClient()) {
            console.log('User not logged in and not in LINE app, redirecting to login');
            // Either redirect to login page
            // router.replace('/login')
            // Or directly trigger login
            liff.login();
          } else {
            console.log('User is already logged in or is in LINE app');
          }
        })

        // const decodedIDToken = liff.getDecodedIDToken() as JWTPayload | null;
        // console.log("User is logged in. ID token:", decodedIDToken);
        // setToken(decodedIDToken); // Store JWT token in state

        // After successful login or initialization, set LIFF object
        
      } catch (error: any) {
        console.error("LIFF initialization failed.", error);
        setLiffError(error.toString()); // Store the error if something goes wrong
      }
    };

    initLiff(); // Call the initialization function
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
  if (!context) {
    throw new Error("useLiff must be used within a LiffProvider");
  }
  return context;
};