import React, { useEffect, useState } from 'react';
import './Loading.css'; // Import the CSS for styling
import logo from '../../assets/logo.png'; // Import your logo image

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Connecting alumni and students...');
    
    // Array of loading messages to cycle through
    const loadingMessages = [
        'Connecting alumni and students...',
        'Building bridges across generations...',
        'Loading initiatives...',
        'Preparing mentorship opportunities...',
        'Gathering alumni stories...',
        'Creating networking possibilities...'
    ];

    useEffect(() => {
        // Simulate loading assets and update progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + 1; // Increment progress more slowly
                } else {
                    clearInterval(progressInterval);
                    return prev; // Stop at 100%
                }
            });
        }, 30); // Update more frequently for smoother animation

        // Cycle through loading messages
        const messageInterval = setInterval(() => {
            setLoadingText(prevText => {
                const currentIndex = loadingMessages.indexOf(prevText);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2000); // Change message every 2 seconds

        return () => {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
        }; // Cleanup on unmount
    }, []);

    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="logo-container">
                    <img src={logo} alt="SARC Logo" className="loading-logo" />
                    <div className="logo-pulse"></div>
                </div>
                
                <h1 className="loading-title">SARC IIT Bombay</h1>
                
                <div className="loading-message-container">
                    <p className="loading-message">{loadingText}</p>
                </div>
                
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="progress-percentage">{progress}%</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;