export class UserTokenResponse {
    id?: number;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiration?: Date; 
    roles?: string[];
}
