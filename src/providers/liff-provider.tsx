"use client";
import { env } from "@/env";
import { liff, type Liff } from "@line/liff";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface LiffContextProps {
  liff: Liff | null;
  liffError: string | null;
  idToken: string | null;
  userProfile: UserProfile | null;
}

interface DecodedToken {
  name: string;
  picture?: string;
  sub: string;
}

interface UserProfile {
  displayName: string;
  pictureUrl?: string;
  userId: string;
}

const LiffContext = createContext<LiffContextProps>({
  liff: null,
  liffError: null,
  idToken: null,
  userProfile: null,
});

export default function Layout({ children }: { children: ReactNode }) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: env.NEXT_PUBLIC_LIFF_ID });
        setLiffObject(liff);

        // Convert this promise chain to await
        await liff.ready;

        if (!liff.isLoggedIn()) {
          // console.log("User not logged in, initiating login...");
          if (env.NEXT_PUBLIC_DISABLE_LIFF_LOGIN === "true") {
            throw new Error("LIFF login is disabled in this environment.");
          }
          liff.login();
        } else {
          // console.log("User is already logged in, decoding ID token...");
          const token = liff.getIDToken();
          if (token) {
            // console.log("ID Token:", token);
            setIdToken(token);
            try {
              const decoded: DecodedToken = jwtDecode(token);
              setUserProfile({
                displayName: decoded.name,
                pictureUrl: decoded.picture,
                userId: decoded.sub,
              });
            } catch (err) {
              console.error("Error decoding ID token:", err);
            }
          }
        }
      } catch (error) {
        // Fix the any type
        console.error("LIFF initialization failed.", error);
        // Properly handle error with type checking
        setLiffError(error instanceof Error ? error.message : String(error));
      }
    };

    // Fix the floating promise by using void operator
    void initLiff();
  }, []);

  return (
    <LiffContext.Provider
      value={{
        liff: liffObject,
        liffError,
        idToken,
        userProfile,
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
