import React from 'react';
import styles from './chalkboard.module.css';

export default class Chalkboard extends React.Component {

    /*
        props = {
            header,
            sections[] = [{
                subSectionHeader
                Item[]
            }]
        }
    */
    constructor(props) {
        super(props);
    }

    render() {
        const { header, sections } = this.props;
        if (!header || !sections) {
            // do nothing
        }
        else {
            return (
                <>
                    <div className={styles.slate}>
                        <h1 className={styles.header1}>{header}</h1>
                        {sections && sections.map((subSection, id) =>
                            <>
                                <h3 className={styles.header3}>{subSection.header}</h3>
                                <ul>
                                    {subSection.items && subSection.items.map((item, index) =>
                                        <li key={`${subSection.header}-${index}`}>
                                            <div>{item.name} - ${item.price} <br />
                                                <span className={styles.caption}>{item.caption}</span>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </>
                        )}
                    </div>
                </>
            )
        }
    }

}
