import { useContext, createContext, type PropsWithChildren, useEffect } from 'react';
import { useStorageState } from '@/utils/useStorageState';
import { AuthRequest, } from 'expo-auth-session';

import PROVIDERS, { ProviderName } from './providers';

const AuthContext = createContext<{
  signIn: (provider: ProviderName) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (provider) => {
          const config = PROVIDERS[provider].config;
          const discovery = PROVIDERS[provider].discovery;

          const request = new AuthRequest(config);
          const response = await request.promptAsync(
            discovery,
            {
              windowFeatures: {
                popup: false,
              }
            }
          );

          console.log("response: ", response);
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
