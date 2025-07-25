import Routes from 'routes';
import Providers from 'app/Providers';

const App = () => (
  <Providers withReactQueryDevTools>
    <Routes />
  </Providers>
);

export default App;
