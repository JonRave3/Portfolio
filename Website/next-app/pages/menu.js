import { Component } from 'react';
import Chalkboard from '../components/chalkboard/chalkboard';
import Loading from "../components/loading/loading";
import { OverrideBackground } from '../modules/theme';
import styles from '../styles/menu.module.css';

export default class MenuPage extends Component
{
    
    constructor(props) {
        super(props);
        this.state = {
            burgers: null,
            sides: null,
            drinks: null,
        };    
    }
    componentDidMount()
    {
        if (!this.state.burgers) {
            fetch('/api/burgers')
                .then(res => res.json())
                .then(data => this.setState({ burgers: data }));
        }
        if (!this.state.sides) {
            fetch('/api/sides')
                .then(res => res.json())
                .then(data => this.setState({ sides: data }));
        }
        if (!this.state.drinks) {
            fetch('/api/drinks')
                .then(res => res.json())
                .then(data => this.setState({ drinks: data }));
        }
    }
    render()
    {
        const { burgers, sides, drinks } = this.state;
        if (!burgers || !sides || !drinks) {
            return (
                <>
                    {OverrideBackground(this.props.Background.src)}
                    <main className={styles.main}>
                        <Loading />
                    </main>
                </>
            );
        }
        else {

            let sections = [
                {
                    header: "Burgers",
                    items: []
                },
                {
                    header: "Sides",
                    items: []
                },
                {
                    header: "Drinks",
                    items: []
                }];
            burgers.map(b => sections[0].items.push(b));
            sides.map(s => sections[1].items.push(s));
            drinks.map(d => sections[2].items.push(d));

            return (
                <>
                    {OverrideBackground(this.props.Background.src)}
                    <main className={styles.main}>
                        <Chalkboard header="Menu" sections={sections} />
                    </main>
                </>
            )
        }
        
    }
}
