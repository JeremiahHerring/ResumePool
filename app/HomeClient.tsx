'use client';

import { useEffect } from 'react';

export default function HomeClient({ userId }) {
  useEffect(() => {
    const saveUser = async () => {
      if (userId) {
        try {
          const response = await fetch('/api/saveUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
            throw new Error('Failed to save user');
          }

          const data = await response.json();
          console.log('User saved:', data);
        } catch (error) {
          console.error('Error saving user:', error);
        }
      }
    };

    saveUser();
  }, [userId]);

  return <h1>Hello World</h1>;
}
