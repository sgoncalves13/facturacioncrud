import { Routes, Route, useNavigate } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';

import { PageLayout } from './components/PageLayout';
import { Profile } from './pages/Profile';
import { Contacts } from './pages/Contacts';
import { Home } from './pages/Home';

import './styles/App.css';
import MenuPrincipal from './componentes/MenuPricipal';
import Articulos from './componentes/Articulos/ListaArticulos';
import CrearArticulo from './componentes/Articulos/CrearArticulo';
import EditarArticulo from './componentes/Articulos/EditarArticulo';

const Pages = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={activeAccount ? <Profile /> : navigate('/')} />
            <Route path="/contacts" element={activeAccount ? <Contacts /> : navigate('/')} />
            <Route path="/Menu" element={activeAccount ? <MenuPrincipal /> : navigate('/')} />
            <Route path="/Articulos" element={activeAccount ? <Articulos /> : navigate('/')} />
            <Route path="/CrearArticulo" element={activeAccount ? <CrearArticulo /> : navigate('/')} />
            <Route path="/EditarArticulo/:idArticulo" element={activeAccount ? <EditarArticulo /> : navigate('/')} />
        </Routes>
    );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <PageLayout>
                <Pages />
            </PageLayout>
        </MsalProvider>
    );
};

export default App;

