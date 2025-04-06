'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';

// Define proper types for the context
interface LiffContextType {
    liff: typeof liff;
    isReady: boolean;
    error: Error | null;
}

const LiffContext = createContext<LiffContextType>({
    liff: liff,  // Provide the actual liff object, not null
    isReady: false,
    error: null,
});

export function LiffProvider({ children, liffId }: { children: React.ReactNode, liffId: string }) {
  const [state, setState] = useState<LiffContextType>({
      liff: liff,  // Initialize with the actual liff object
      isReady: false,
      error: null,
  });

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ 
          liffId,
          withLoginOnExternalBrowser: true
        });
        
        setState({
          liff,  // This is the actual liff object
          isReady: true,
          error: null,
        });
        
        liff.ready.then(() => {
          console.log("LIFF is ready");
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
      } catch (error) {
        console.error("LIFF initialization error:", error);
        setState(prev => ({ 
          ...prev, 
          error: error as Error, 
          isReady: true 
        }));
      }
    };
    
    initLiff();
  }, [liffId]);

  return (
    <LiffContext.Provider value={state}>
      {children}
    </LiffContext.Provider>
  );
}

export const useLiff = () => useContext(LiffContext);