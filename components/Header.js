import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import {Inter, Rubik, Roboto_Mono} from "next/font/google";
import Image from "next/image";
import logoImage from "../public/logo.svg";

const robotoMono = Roboto_Mono({subsets: ["latin"], weight:"500"});
const inter = Inter({subsets: ["latin"], weight:"500"});
const rubik = Rubik({subsets:["latin"], weight:"500"});

const StyledHeader = styled.header`
  background-color: #ebe8e8;
`;
const Logo = styled(Link)`
  color:#222;
  text-decoration:none;
  position: relative;
  z-index: 3;
  font-size:1.6em;
  @media screen and (max-width: 862px){
    display:none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 20px 0;

`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
    z-index:2;
  font-size:1.2em;
  gap: 30px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #ebe8e8;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#222;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 50px;
  height: 50px;
  border:0;
  color:#222;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const LogoImageWrapper = styled(Link)`
  cursor: pointer;
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'} className={rubik.className}>Healthy Haven</Logo>
          <LogoImageWrapper href={'/'} >
          <Image src={logoImage} height={50}/>
          </LogoImageWrapper>
          <StyledNav mobileNavActive={mobileNavActive} className={robotoMono.className}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            {/* <NavLink href={'/account'}>Account</NavLink> */}
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}