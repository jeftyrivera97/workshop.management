
export interface AuthTokenData {
    access_token: string;
    user:         User;
    expires_at:   string;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    created_at:        null;
    updated_at:        null;
    deleted_at:        null;
}
