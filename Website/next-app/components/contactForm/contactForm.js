import React from 'react';
import styles from './contactForm.module.css';
import Filter from 'bad-words';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i
);

const validPhoneRegex = RegExp(
    /^([0-9]{0,3}[-]{0,1}){0,1}[0-9]{3}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}$/i
);

const validate = errors => {
    let { email, phone, message } = errors;
    let errs = [email, phone, message].filter(x => x.length > 0);
    return errs;
};

const filter = new Filter();

const checkBadWords = msg => {
    return filter.isProfane(msg);
}

export default class ContactForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            phone: null,
            message: null,
            errors: {
                email: '',
                phone: '',
                message: ''
            },
            disable: true
        }
    }

    handleOnPhoneChange = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let s = { ...this.state };
        if (value === '' || validPhoneRegex.test(`${value}`)) {
            s.errors.phone = ``;
            s.phone = value;
        } else {
            s.errors.phone = `PhoneNumber is not valid.`;
        }
        s.disable = this.canSend(s);
        this.setState(s);
    }

    handleOnEmailChange = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let s = { ...this.state };
        if (value === '' || validEmailRegex.test(value)) {
            s.errors.email = ``;
            s.email = value;
        } else {
            s.errors.email = `Email is not valid.`;
        }
        s.disable = this.canSend(s);
        this.setState(s);
    };

    handleOnMessageChange = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let s = { ...this.state };
        if (value === '' || !checkBadWords(value)) {
            s.errors.message = '';
            s.message = value;
        } else {
            s.errors.message = `Message contains inappropriate language`;
        }
        s.disable = this.canSend(s);
        this.setState(s);
    };
    
    canSend = (s) => {
        // check for validation errors
        let { phone, email, message } = s.errors;
        let hasNoErrors = (
            phone.length === 0 &&
            email.length === 0 &&
            message.length === 0
        );
        // check for required fields
        let hasRequired = (
            (s.email && s.email !== '') &&
            (s.message && s.message !== '')
        );
        // true, iff, no-errors and has all required fields
        let send = !(hasNoErrors && hasRequired);
        console.log("canSend", send);
        return send;
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        let errs = validate(this.state.errors);
        if (errs.length === 0) {
            let s = { ...this.state };
            this.setState(s);
            this.props.completed(true);
        } else {
            console.log("errors", errs);
        }
    }

    render() {
        let { errors } = this.state;
        return <>
            <div className="contactForm">
                <form className={styles.contactForm}
                    onSubmit={this.handleOnSubmit}
                    noValidate>
                    <h1 className={styles.header1}>Contact Form</h1>

                    <label htmlFor="email" className={styles.label}>Email &nbsp;
                        {errors.email && errors.email.length > 0 &&
                            <span className={styles.errors}>{errors.email}</span>
                        }
                    </label>
                    <input name="email"
                        type="text"
                        className={styles.input}
                        placeholder="my.email@email.com"
                        onChange={this.handleOnEmailChange}
                        noValidate
                    />

                    <label htmlFor="phoneNumber" className={styles.label}>Phone &nbsp;
                        {errors.phone && errors.phone.length > 0 &&
                            <span className={styles.errors}>{errors.phone}</span>
                        }
                    </label>
                    <input name="phoneNumber"
                        type="tel"
                        className={styles.input}
                        placeholder="XXX-XXX-XXX"
                        minLength='0'
                        maxLength='14'
                        onChange={this.handleOnPhoneChange}
                        noValidate
                    />

                    <label htmlFor="message" className={styles.label}>Message  &nbsp;
                        {errors.message && errors.message.length > 0 &&
                            <span className={styles.errors}>{errors.message}</span>
                        }
                    </label>
                    <textarea name="message"
                        cols="100"
                        rows="20"
                        className={styles.input}
                        placeholder="Write your message here."
                        onChange={this.handleOnMessageChange}
                        noValidate
                    ></textarea>

                    <button className={styles.submitBtn}
                        disabled={this.state.disable}>Send</button>
                </form>
            </div>
        </>
    }
};