import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    let [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const authToken = JSON.parse(sessionStorage.getItem('authToken'));
            const authToken = JSON.parse(sessionStorage.getItem('authToken')); // Get the token from storage

            if (!authToken) {
                setError('No auth token found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/api/usercredentials/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${authToken}`, // Use the auth token
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user. Status: ${response.status}`);
                }

                const data = await response.json();
                setCurrentUser(data); // Store the user data in state
            } catch (err) {
                console.error('Error fetching current user:', err);
                setError(err.message);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchCurrentUser();
    }, []); // Run once when the component mounts
    currentUser = sessionStorage.getItem("User");
    return { currentUser, loading, error };
};

export default useCurrentUser;
