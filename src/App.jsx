import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/store';
import AppRouter from '@/router/AppRouter';
import SettingsProvider from '@/components/SettingsProvider';
import '@/styles/global.css';
import '@/styles/themes.css';

const App = () => {
  return (
    <Provider store={store}>
      <SettingsProvider>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
        />
      </SettingsProvider>
    </Provider>
  );
};

export default App;
