import { Component } from 'react';
import styles from './layout.module.css';
import css from 'styled-jsx/css';

import Header from '../header/header';


export default class Layout extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const { children } = this.props;
        return (
            <>         
                <Header></Header>
                {children}
            </>
        )
    }
}