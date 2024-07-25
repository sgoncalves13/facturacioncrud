import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Nav, Navbar, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import { loginRequest } from '../authConfig';
import { AccountPicker } from './AccountPicker';
import { clearStorage } from '../utils/storageUtils';

export const NavigationBar = () => {
    const [showProfilePicker, setShowProfilePicker] = useState(false);
    const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginRedirect = () => {
        /**
         * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
         * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
         * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
         */

        instance.loginRedirect(loginRequest)
            .catch((error) => console.log(error));
    };

    const handleLoginPopup = () => {
        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/'
        }).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        let account = instance.getActiveAccount();
        clearStorage(account);

        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    };

    const handleLogoutPopup = () => {
        let account = instance.getActiveAccount();
        clearStorage(account);

        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
            account: instance.getActiveAccount(),
        });
    };

    const handleSwitchAccount = () => {
        setShowProfilePicker(!showProfilePicker);
    };

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Inicio
                </a>
                <AuthenticatedTemplate>
                    <Nav.Link className="navbarButton" href="/Menu">
                        Menú Principal
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/profile">
                        Perfil
                    </Nav.Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton
                            variant="warning"
                            drop="start"
                            title={activeAccount ? activeAccount.name : 'Unknown'}
                        >
                            <Dropdown.Item as="button" onClick={handleSwitchAccount}>
                                Switch account
                            </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                                Sign out
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                <div className="collapse navbar-collapse justify-content-end">
                    <Button variant="secondary" className="ml-auto" onClick={handleLoginPopup}>
                        Sign In
                    </Button>
                </div>
                </UnauthenticatedTemplate>
            </Navbar>
            <AccountPicker show={showProfilePicker} handleSwitchAccount={handleSwitchAccount} />
        </>
    );
};
