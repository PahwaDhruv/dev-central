import {useEffect} from 'react';
import '../styles/styles.scss'
import Layout from '../components/Layout';
import {wrapper} from '../redux/store';
import AuthProvider from '../utils/AuthProvider';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    
  )
}

export default wrapper.withRedux(MyApp)
