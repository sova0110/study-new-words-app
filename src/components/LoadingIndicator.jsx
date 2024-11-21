import React from 'react';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator = () => {
    return (
        <div className={styles.loadingIndicator}>
            <div className={styles.hourglass}>
                <div className={styles.sand}></div>
            </div>
        </div>
    );
};

export default LoadingIndicator;