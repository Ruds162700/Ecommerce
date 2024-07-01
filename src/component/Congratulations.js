// CongratulationPopup.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Congratulations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Congratulations!</h2>
        <p>Your order has been submitted successfully.</p>
      </div>
    </div>
  );
};

export default Congratulations;
