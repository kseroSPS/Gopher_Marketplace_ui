const loginUser = async (googleOAuthToken) => {
   try{ const response = await fetch('http://localhost:8000/auth-receiver', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential: googleOAuthToken }), // Send OAuth credential
});

    if (!response.ok) {
    throw new Error(`Failed to authenticate. Status: ${response.status}`);
}

    const data = await response.json();
    console.log('Auth Token:', data.auth_token);

// Store the auth token securely
    localStorage.setItem('authToken', data.auth_token);
    return data.auth_token; // Return the token for further use if needed
    } 
    catch (error) {
        console.error('Error during login:', error);
        throw error; // Re-throw the error to handle it elsewhere
    }
}
export default loginUser;



    
   

