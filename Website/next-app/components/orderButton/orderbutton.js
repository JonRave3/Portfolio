import { Component } from 'react';
import gene from '../../assets/gene_burger_costume.png';
import styles from './orderbutton.module.css';
import Link from 'next/link';
import Image from 'next/image';


export default class OrderButton extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <>
                <div className={styles.linkContainer}>
                    <Link href='/order'>
                        <a className={styles.link}>
                            <img
                                className={styles.button}
                                src={gene.src}
                                alt='Order Online'
                            />
                        </a>
                    </Link>
                    <h1 className={styles.labelContainer}>Order Online</h1>
                </div>
            </>
        )
    }
}