import React, { useEffect, useState } from 'react';
import './Loading.css'; // Import the CSS for styling
import logo from '../../assets/logo.png'; // Import your logo image

const Loading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading assets and update progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + 10; // Increment progress
                } else {
                    clearInterval(interval);
                    return prev; // Stop at 100%
                }
            });
        }, 300); // Update every 300ms

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Calculate scale based on progress
    const scale = 1 + (progress / 100); // Scale from 1 to 2

    return (
        <div className="loading-container">
            <img 
                src={logo} 
                alt="Logo" 
                className="loading-logo" 
                style={{ transform: `scale(${scale})` }} 
            /> {/* Scale logo */}
            <h2 
                className="loading-text" 
                style={{ transform: `scale(${scale})` }}
            >
                
            </h2> {/* Scale welcome message */}
            <div className="progress-bar">
                <div 
                    className="progress" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <h3 className="progress-text">{progress}%</h3> {/* Display percentage */}
        </div>
    );
};

export default Loading;