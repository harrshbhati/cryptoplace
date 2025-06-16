import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/SignUp/Signup";

export default function App() {
  return (
    <div className="App">
      <header>
        <SignedOut>
          <SignInButton />
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <>
              <SignedIn>
                <h1>Welcome! You are signed in.</h1>
              </SignedIn>
              <SignedOut>
                <h1>Please sign in to continue</h1>
              </SignedOut>
            </>
          } />
        </Routes>
      </main>
    </div>
  );
} 