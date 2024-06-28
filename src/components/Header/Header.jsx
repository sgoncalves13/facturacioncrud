import styled from 'styled-components';

import deviceSize from '../../styles/breakpoints';

import logo from '../../assets/logo.svg';

const HeaderContainer = styled.header`
  position: relative;
  background-color: #373B53;
  display: flex;
  z-index: 8000;
  align-items: center;
  @media screen and (min-width: ${deviceSize.lg}) {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 6.4375rem;
    height: 70%;
    border-radius: 0 1.25rem 1.25rem 0;
    margin-top: 10%;
  }
`;

const Logo = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  @media screen and (min-width: ${deviceSize.lg}) {
    width: 100%;
    height: auto;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Invoice app logo" />
    </HeaderContainer>
  );
}

export default Header;
