import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './component/Layout/Layout';
import { SnackbarProvider } from 'notistack';

function App() {
  return <SnackbarProvider maxSnack={3
  }><Layout />
  </SnackbarProvider>
}

export default App;
