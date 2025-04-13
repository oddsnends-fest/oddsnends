export interface LineApiError {
  error: string;
  error_description: string;
}

export interface VerifiedToken {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  nonce: string;
  amr: string[];
  name: string;
  picture: string;
  email: string;
}
