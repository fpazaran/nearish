interface User {
  uid: string;
  name: string;
  couple?: Couple;
}

interface Couple {
  id: string;
  partner: {
    uid: string;
    name: string;
  }
}

interface Invite {
  invite_code: string;
  expires_at: number;
}