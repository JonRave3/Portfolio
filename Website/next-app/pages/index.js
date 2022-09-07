import { Component } from 'react';
import styles from '../styles/home.module.css';
import OrderButton from '../components/orderButton/orderbutton';
import Footer from '../components/Footer/footer';
import { OverrideBackground } from '../modules/theme';

export default class HomePage extends Component
{
  constructor(props)
  {
    super(props);
  }

  render() {

    return (
      <>
        {OverrideBackground(this.props.Background.src)}
        <main className={styles.Main}>
          <div className={styles.dropDownBanner}>
            {/* <img id="bannerOpening" src="banner_opening.png" />
            <img id="bannerReOpening" src="banner_re_opening.png" />
            <img id="bannerReReOpening" src="banner_re_re_opening.png" />
            <img id="bannerReReReOpening" src="banner_re_re_re_opening.png" /> */}
          </div>
          <div>
            <OrderButton />
          </div>
        </main>
        <Footer></Footer>
      </>
    );
  }
};
