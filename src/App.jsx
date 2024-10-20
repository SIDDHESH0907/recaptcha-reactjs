import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const App = () => {
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('Please verify the reCAPTCHA');

  const siteKey = '6LdypGYqAAAAANW3jxrHocYABbypg7_C5ZazIneA'; // Replace with your Google reCAPTCHA site key

  const onRecaptchaChange = (token) => {
    if (token) {
      // Send the reCAPTCHA token to the backend for verification
      axios
        .post('https://recaptcha-nodejs.onrender.com/verify-recaptcha', { token })
        .then((response) => {
          if (response.data.success) {
            setVerified(true);
            setMessage('Hello');
          } else {
            setMessage('Recaptcha verification failed');
          }
        })
        .catch((error) => {
          console.error('Error verifying recaptcha:', error);
          setMessage('An error occurred');
        });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{message}</h1>
      {!verified && (
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={onRecaptchaChange}
        />
      )}
    </div>
  );
};

export default App;
