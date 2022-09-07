import '../styles/globals.css'
import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import { DetermineBackground } from '../modules/theme';

function MyApp({ Component, pageProps }) {
  
  let router = useRouter();
  let path = router.pathname.slice(1);
  pageProps.Background = DetermineBackground(path);

  // apply to layout
  return (
    <>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </>
  );

}

export default MyApp
