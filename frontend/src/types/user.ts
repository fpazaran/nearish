export interface User {
  uid: string;
  name: string;
  couple?: Couple;
}

export interface Couple {
  id: number;
  partner?: {
    uid: string;
    name: string;
  }
}

export interface Invite {
  code: number;
  expires_at: number;
}