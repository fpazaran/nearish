import { User } from '../../types/user';
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
export async function createCode(): Promise<string> {
  const response = await authenticatedFetch('/auth/create-code');
  if (!response.ok) {
    throw new Error('Failed to create code');
  }
  return response.json();
}