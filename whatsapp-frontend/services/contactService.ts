
import { User } from '../types';
import { MOCK_USERS } from '../constants';

// In a real Spring Boot app, this would be `api/v1/contacts`

export const ContactService = {
    /**
     * Simulates searching for a user by phone number in the backend Database.
     * API: GET /api/users/search?phone={phone}
     */
    searchUserByPhone: async (phone: string): Promise<User | null> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate Backend Query
                const foundUser = Object.values(MOCK_USERS).find(
                    u => u.phone === phone || u.name.includes(phone) // Allow searching by name for demo convenience
                );
                
                if (foundUser) {
                    resolve(foundUser);
                } else {
                    resolve(null);
                }
            }, 600); // Simulate network latency
        });
    },

    /**
     * Get list of friends (Sync contacts)
     * API: GET /api/contacts
     */
    getContacts: async (): Promise<User[]> => {
        // Mock implementation
        return Object.values(MOCK_USERS).filter(u => !u.isBot);
    }
};
