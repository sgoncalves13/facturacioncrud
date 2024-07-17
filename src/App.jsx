import { Routes, Route, Navigate  } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { AnimatePresence } from 'framer-motion';

import { PageLayout } from './components/PageLayout';
import { Profile } from './pages/Profile';
import { Contacts } from './pages/Contacts';
import { Home } from './pages/Home';

import './styles/App.css';
import MenuPrincipal from './componentes/MenuPricipal';
import Articulos from './componentes/Articulos/ListaArticulos';
import CrearArticulo from './componentes/Articulos/CrearArticulo';
import EditarArticulo from './componentes/Articulos/EditarArticulo';
import Header from './components/Header/Header';
import { FacturaHome } from './componentes/Facturas/FacturaHome';
import FacturaDetail from './componentes/Facturas/FacturaDetail';
import EditFactura from './componentes/Facturas/EditFactura';
import CreateFactura from './componentes/Facturas/CreateFactura';
import { ClientesHome } from './componentes/Clientes/ClientesHome';
import ClienteDetail from './componentes/Clientes/Detalle/ClienteDetail';
import EditCliente from './componentes/Clientes/Edit/EditCliente';
import CreateCliente from './componentes/Clientes/Create/CreateCliente';

const ProtectedRoute = ({ children }) => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return activeAccount ? children : <Navigate to="/" />;
};

const Pages = () => {
    return (
        <AnimatePresence mode='wait'>
<Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/Menu" element={
                <ProtectedRoute>
                    <MenuPrincipal />
                </ProtectedRoute>
            } />
            <Route path="/Articulos" element={
                <ProtectedRoute>
                    <Articulos />
                </ProtectedRoute>
            } />
            <Route path="/CrearArticulo" element={
                <ProtectedRoute>
                    <CrearArticulo />
                </ProtectedRoute>
            } />
            <Route path="/EditarArticulo/:idArticulo" element={
                <ProtectedRoute>
                    <EditarArticulo />
                </ProtectedRoute>
            } />

            <Route path="/Facturas" element={
                            <ProtectedRoute>
                                <FacturaHome />
                            </ProtectedRoute>
            } />

            <Route path="/Facturas/Create" element={
                            <ProtectedRoute>
                                <CreateFactura />
                            </ProtectedRoute>
            } />

            <Route path="/Facturas/Edit/:idFactura" element={
                    <ProtectedRoute>
                        <EditFactura />
                    </ProtectedRoute>
            } />

            <Route path="/Facturas/:idFactura" element={
                    <ProtectedRoute>
                        <FacturaDetail />
                    </ProtectedRoute>
            } />

            <Route path="/Clientes" element={
                            <ProtectedRoute>
                                <ClientesHome />
                            </ProtectedRoute>
            } />

            <Route path="/Clientes/Edit/:idCliente" element={
                    <ProtectedRoute>
                        <EditCliente />
                    </ProtectedRoute>
            } />

            <Route path="/Clientes/:idCliente" element={
                    <ProtectedRoute>
                        <ClienteDetail />
                    </ProtectedRoute>
            } />

            <Route path="/Clientes/Create" element={
                            <ProtectedRoute>
                                <CreateCliente />
                            </ProtectedRoute>
            } />

        </Routes>
        </AnimatePresence>
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