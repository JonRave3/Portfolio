import React from 'react';
import styles from './loading.module.css';
import kuchikopi from '../../assets/kuchi-kopi.png';

export default class Loading extends React.Component
{
    componentDidMount()
    {
        setTimeout(() => { }, 1000);
    }
    render() {
        return (
            <>
                <img className={styles.img} src={kuchikopi.src} />
            </>
        );
    }
}