import styles from './header.module.css';
import { Component } from 'react';
import Link from 'next/link';

export default class Header extends Component {
    
    constructor(props) { 
        super(props);
    }

    render() {
        return (
            <>
                <header className={styles.header}>
                    <div className={styles.logoContainer}>
                        <Link href="/">
                            <a className={styles.a.logo}>
                                <img className={styles.img} src='/logo.png' alt="Bob's Burgers" />
                            </a>
                        </Link>
                    </div>
                    <navbar className={styles.navbar}>
                        <Link href="/menu">
                            <a className={styles.a}>Menu</a>
                        </Link>
                        <Link href="/specials">
                            <a className={styles.a}>Specials</a>
                        </Link>
                        <Link href="/contact">
                            <a className={styles.a}>Contact <span className={styles.firstLetter}>Us</span></a>
                        </Link>
                    </navbar>
                </header>
            </>
        );
    }
}