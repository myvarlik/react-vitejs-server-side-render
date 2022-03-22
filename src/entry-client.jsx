import ReactDOM from 'react-dom'
import { Provider } from 'trim-redux';
import { BrowserRouter } from 'react-router-dom';
import { clientCreateStore } from "./setup/store";
import { App } from './App'
import { HelmetProvider } from 'react-helmet-async';

const store = clientCreateStore();

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)