import './App.css';
import 'antd/dist/antd.css';
import './less/reset.min.css' 
import RouterPage from './routers';
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterPage></RouterPage>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
