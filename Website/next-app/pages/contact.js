import React, { Component } from 'react';
import { OverrideBackground } from '../modules/theme';
import ContactForm from '../components/contactForm/contactForm';
import 'normalize-css/normalize.css';
import styles from '../styles/Contact.module.css';
import Modal from '../components/modal/modal';
import { Router } from 'next/router';

export default class ContactPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            sent: false
        };
    }
    onSend = (value) => { 
        this.setState({ sent: value });
    };
    onClose = (event) => {
        event.preventDefault();
    }
    
    render()
    {
        if (!this.state.sent) {
            return (
                <>
                    {OverrideBackground(this.props.Background.src)}
                    <main className={styles.main}>
                        <ContactForm completed={this.onSend}></ContactForm>
                    </main>
                </>
            )
        } else {
            return (
                <>
                    {OverrideBackground(this.props.Background.src)}
                    <main className={styles.main}>
                        <Modal title="Message Sent!" message="Your message has been successfully sent! You should receive a confirmation email shortly." />
                    </main>
                </>
            ) 
        }
        
    }
}