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
import { usePathname } from "next/navigation";
import { fetchUserData } from "@/lib/fetch-user-data";
import { createUser } from "@/lib/create-user";

interface LiffContextProps {
  liff: Liff | null;
  liffError: string | null;
  idToken: string | null;
  userProfile: UserProfile | null;
  accessToken: string | null;
}

interface DecodedToken {
  exp: number;
  name: string;
  picture?: string;
  sub: string;
}

export interface UserProfile {
  displayName: string;
  pictureUrl?: string;
  userId: string;
}

const LiffContext = createContext<LiffContextProps>({
  liff: null,
  liffError: null,
  idToken: null,
  userProfile: null,
  accessToken: null,
});

export default function Layout({ children }: { children: ReactNode }) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const pathname = usePathname();

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: env.NEXT_PUBLIC_LIFF_ID });
        setLiffObject(liff);

        // Convert this promise chain to await
        await liff.ready;

        if (!liff.isLoggedIn()) {
          console.log("User not logged in, initiating login...");
          if (env.NEXT_PUBLIC_DISABLE_LIFF_LOGIN === "true") {
            throw new Error("LIFF login is disabled in this environment.");
          }
          liff.login();
        } else {
          console.log("User is already logged in, decoding ID token...");
          const token = liff.getIDToken();
          if (!token) throw new Error("ID Token is null.");
          const accessToken = liff.getAccessToken();
          if (!accessToken) throw new Error("Access Token is null.");
          setAccessToken(accessToken);
          setIdToken(token);
          try {
            const decoded: DecodedToken = jwtDecode(token);
            setUserProfile({
              displayName: decoded.name,
              pictureUrl: decoded.picture,
              userId: decoded.sub,
            });
            const user = await fetchUserData(accessToken);
            if (!user) {
              const newUser = await createUser(accessToken, {
                displayName: decoded.name,
                pictureUrl: decoded.picture,
                userId: decoded.sub,
              });
            }
          } catch (err) {
            console.error("Error decoding ID token:", err);
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
    if (pathname !== "/register") return;
    void initLiff();
  }, [pathname]);

  return (
    <LiffContext.Provider
      value={{
        liff: liffObject,
        liffError,
        idToken,
        userProfile,
        accessToken,
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
