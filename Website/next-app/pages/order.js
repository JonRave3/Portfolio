import { Component } from 'react';
import { OverrideBackground } from '../modules/theme';

export default class OrderPage extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <>
                {OverrideBackground(this.props.Background.src)}
                <main>
                    <h1>Place your order</h1>
                </main>
            </>
        )
    }
}