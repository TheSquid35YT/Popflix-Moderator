import type { AuthModes } from './api.js';
export interface OAuthSession {
    providerConfigKey: string;
    provider: string;
    connectionId: string;
    callbackUrl: string;
    authMode: AuthModes;
    id: string;
    connectionConfig: Record<string, string>;
    environmentId: number;
    webSocketClientId: string | undefined;
    codeVerifier: string;
    requestTokenSecret?: string;
    activityLogId: string;
}
