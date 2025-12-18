import React from 'react';
import './CurveDivider.css';

const CurveDivider = ({ variant = 1, className = '' }) => {
    // Different curve path variations
    const curves = {
        1: {
            fill: "M0,0 L0,60 Q360,100 720,60 Q1080,20 1440,60 L1440,0 Z",
            line: "M0,60 Q360,100 720,60 Q1080,20 1440,60"
        },
        2: {
            fill: "M0,0 L0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 Z",
            line: "M0,40 Q360,0 720,40 Q1080,80 1440,40"
        },
        3: {
            fill: "M0,0 L0,50 Q480,90 960,50 Q1200,30 1440,70 L1440,0 Z",
            line: "M0,50 Q480,90 960,50 Q1200,30 1440,70"
        }
    };

    const selectedCurve = curves[variant] || curves[1];

    return (
        <div className={`curve-divider-container ${className}`}>
            <svg
                className="curve-svg"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Main curve fill */}
                <path
                    className="curve-fill"
                    d={selectedCurve.fill}
                />
                {/* Blue accent line on top of the curve */}
                <path
                    className="curve-accent"
                    d={selectedCurve.line}
                    fill="none"
                    strokeWidth="3"
                />
            </svg>
        </div>
    );
};

export default CurveDivider;
