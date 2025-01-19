import React, { useState, useEffect } from "react";
import NavBar from "./ui/NavBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BooksPage from "./ui/BooksPage";
import TextBooksPage from "./ui/TextBookPage";
import ClothesPage from "./ui/ClothesPage";
import Home from "./ui/Home";
import AddProduct from "./ui/AddProduct";
import LoginPage from "./ui/LoginPage"; // Import LoginPage
import useCurrentUser from "./ui/CurrentUser"; // Hook to fetch current user
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  let { currentUser, loading, error } = useCurrentUser(); // Fetch the current user
  const [authChecked, setAuthChecked] = useState(false); // Track if auth logic is complete

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true); // Mark auth check as complete when loading is done
    }
  }, [loading]);

  if (!authChecked) {
    return <p>Checking authentication...</p>; // Show a loader while checking authentication
  }
  return (
    <GoogleOAuthProvider clientId="512753265261-hicrjc1ocn7umlln9d6s6h5pgun0v105.apps.googleusercontent.com">
      <Router>
        <div className="App bg-maroon-492">
          <NavBar /> {/* Navigation bar component */}

          {/* Define the routes for each page */}
          <Routes>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/textbooks" element={<TextBooksPage />} />
            <Route path="/clothes" element={<ClothesPage />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/add-product"
              element={
                currentUser ? (
                  <AddProduct />
                ) : (
                  <Navigate to="/login" replace /> // Redirect to login if not authenticated
                )
              }
            />
            <Route
              path="/login"
              element={
                !currentUser ? (
                  <LoginPage /> // Show login page if not authenticated
                ) : (
                  <Navigate to="/home" replace /> // Redirect authenticated users to home
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
