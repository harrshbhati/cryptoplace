import React from 'react';
import { SignUp } from "@clerk/clerk-react";
import './signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'signup-button',
            card: 'signup-card',
            headerTitle: 'signup-title',
            headerSubtitle: 'signup-subtitle',
          }
        }}
      />
    </div>
  );
};

export default Signup;
