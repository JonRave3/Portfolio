import { Component } from "react";
import Chalkboard from "../components/chalkboard/chalkboard";
import Loading from "../components/loading/loading";
import { OverrideBackground } from "../modules/theme";
import styles from '../styles/menu.module.css';

export default class SpecialsPage extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state = {
            specials: null
        };
    }

    componentDidMount() {
        if (!this.state.specials) {
            fetch('/api/specials')
                .then(res => res.json())
                .then(data => this.setState({ specials: data }));
        }
    }

    render()
    {
        const { specials } = this.state;
        if (!specials) {
            return (
                <>
                    {OverrideBackground(this.props.Background.src)}
                    <main>
                        <Loading />
                    </main>
                </>
            );
        }
        else {
            let sections = [{
                header: "Burgers",
                items: []
            }];
            specials.map(x => sections[0].items.push(x));
            return (
                <>
                    {OverrideBackground(this.props.Background.src)}
                    <main className={styles.main}>
                        <Chalkboard header="Specials" sections={sections} />
                    </main>
                </>
            );
        }
        
    }
}