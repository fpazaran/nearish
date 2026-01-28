import { Couple, Invite, User } from '../../types/user';
import { authenticatedFetch } from './apiClient';

interface PartnerResponse {
    uid: string
    name: string
}

interface CoupleResponse {
    id: number
    partner: PartnerResponse | null
}

export interface MeResponse {
    uid: string
    name: string
    couple: CoupleResponse | null
}

/**
 * Gets the current user's profile information
 * Returns user info and couple info if the user is in a relationship
 */
export async function getMe(): Promise<User> {
  const response = await authenticatedFetch('/auth/me');
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  
  const meResponse: MeResponse = await response.json();
  const user: User = {
    uid: meResponse.uid,
    name: meResponse.name,
    couple: meResponse.couple ? {
      id: meResponse.couple.id,
      partner: meResponse.couple.partner ? {
        uid: meResponse.couple.partner.uid,
        name: meResponse.couple.partner.name,
      } : undefined,
    } : undefined,
  };
  return user;
}

/**
 * Updates the current user's name
 * Returns true if the name was updated successfully, false otherwise
 */
export async function updateName(name: string): Promise<boolean> {
  const response = await authenticatedFetch('/auth/update-name', {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error('Failed to update name');
  }
  return response.ok;
}

/**
 * Creates a new code for the current user
 * Returns the code if it was created successfully, undefined otherwise
 */
export async function createCode(): Promise<Invite> {
  const response = await authenticatedFetch('/auth/create-code');
  if (!response.ok) {
    throw new Error('Failed to create code');
  }
  const inviteCode: Invite = await response.json();
  return inviteCode;
}


/**
 * Joins a couple using an invite code
 * Returns the couple if it was joined successfully, undefined otherwise
 */
export async function joinCouple(code: string): Promise<Couple> {
  const response = await authenticatedFetch('/auth/join-couple', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  if (!response.ok) {
    throw new Error('Failed to join couple');
  }
  const couple: Couple = await response.json();
  return couple;
}