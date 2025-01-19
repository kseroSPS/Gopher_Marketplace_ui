import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSuccess = async (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      console.error("Missing credential in response");
      setErrorMessage("Failed to retrieve login credential. Please try again.");
      return;
    }

    console.log("Success! Credential Response:", credentialResponse);

    try {
      // Send the credential (Google ID Token) to your backend
      const response = await fetch("http://localhost:8000/auth-receiver", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `credential=${encodeURIComponent(credentialResponse.credential)}`,
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with the backend");
      }

      const data = await response.json();
      console.log("Authenticated user:", data.user_data);

      // Store the auth token and user data
      sessionStorage.setItem("authToken", JSON.stringify(data.auth_token));
      sessionStorage.setItem("User", JSON.stringify(data.user_data));

      // Redirect after login
    //   window.location.href = "/home";
    } catch (error) {
      console.error("Error with logging in:", error);
      setErrorMessage("Failed to authenticate. Please try again later.");
    }
  };

  const onFailure = (error) => {
    console.error("Login failed. Error:", error);
    setErrorMessage("Google login failed. Please try again.");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login with Google</h1>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
