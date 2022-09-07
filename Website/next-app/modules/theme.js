import menu from '../assets/menu_background.jpg';
import home from '../assets/background.jpg';
import contact from '../assets/contact_background.webp';
import orders from '../assets/orders_background.webp';
import specials from '../assets/specials_background.jpg';

import css from 'styled-jsx/css';

export const Backgrounds = {
    menu: menu,
    index: home,
    contact: contact,
    order: orders,
    specials: specials
};

export const DetermineBackground = (path) => {
    return Backgrounds[path] || Backgrounds['index'];
};

export const OverrideBackground = (src) =>
{
    const globalOverrides = css.global`
            body {
                background-image: url(${src});
                background-color: black;
                background-size: cover;
                background-repeat: no-repeat;
            }
        `;
    return <style jsx global>{globalOverrides}</style>
}