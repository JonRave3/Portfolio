import { Component } from 'react';
import styles from './footer.module.css';
import Image from 'next/image';

export default class Footer extends Component
{
    constructor(props)
    {
        super(props);
    }

    render() 
    {
        return (
            <>
                <footer className={styles.footer}>
                    <a href=""
                        target="_blank"
                        rel="noopener noreferrer">
                        Powered by{' '}
                        <span className={styles.logo}>
                            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                        </span>
                    </a>
                </footer>
            </>
        )
    }
}