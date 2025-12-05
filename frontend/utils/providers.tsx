import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';
import Constants from "expo-constants";

const { appEnv } = Constants.expoConfig.extra;
const isWeb = Platform.select({ native: false, default: true })

type ProviderConfig = {
  clientId: string,
  scopes: string[],
  redirectUri: string
}

type ProviderDiscovery = {
  authorizationEndpoint: string,
  tokenEndpoint: string,
  revocationEndpoint: string
}

type AuthProvider = {
  config: ProviderConfig,
  discovery: ProviderDiscovery
}

export type ProviderName = "google" // Later, add | unions for other names

let redirectUris
if (isWeb) {
  redirectUris = {
    dev: "http://localhost:3000/auth/google/signin",
    prod: "foo.bar"
  }
} else {
  redirectUris = {
    dev: makeRedirectUri(),
    prod: makeRedirectUri()
  }
}

const GoogleAuthDev: AuthProvider = {
  config: {
    clientId: "815343924798-3ecpokb2983d5s90odmtilanaspcb8dc.apps.googleusercontent.com",
    scopes: ["email"],
    // This should automatically take in the schema defined in app.config
    redirectUri: appEnv === 'dev' ? redirectUris['dev'] : redirectUris['prod']
  },
  discovery: {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "foo (the client doesn't need this)",
    revocationEndpoint: "https://oauth2.googleapis.com/revoke"

  }
}

const PROVIDERS: Record<ProviderName, AuthProvider> = {
  google: GoogleAuthDev
}
export default PROVIDERS
