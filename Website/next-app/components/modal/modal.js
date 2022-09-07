import React from 'react';
import styles from './modal.module.css';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
    }
    close = () => {
        console.log('closing...');
    }
    render() {
        let { title, message } = this.props; 
        return (
            <>
                <div name="modal-container"
                    className={styles.modalContainer}>
                    <div name="title-area"
                        className={styles.titleArea}>
                        <h1 className={styles.header1}>{title}</h1>
                    </div>
                    <div name="body-area" className={styles.bodyArea}>
                        <p>{message}</p>
                    </div>
                    <div name="footer-area" className={styles.footerArea}>
                        <button className={styles.closeBtn} onClick={this.close}>Close</button>
                    </div>
                </div>
            </>
        );
    }
}