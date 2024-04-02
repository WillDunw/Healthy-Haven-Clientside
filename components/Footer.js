import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { Inter, Rubik, Roboto_Mono } from "next/font/google";
import Link from "next/link";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "500" });
const inter = Inter({ subsets: ["latin"], weight: "500" });
const rubik = Rubik({ subsets: ["latin"], weight: "500" });

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #ebe8e8;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.2em;
  cursor: pointer;

  @media screen and (max-width: 768px) {
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;

  font-family: "Poppins", sans-serif;
  font-weight: 500;
`;

const CreditsWrapper = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  font-size: 1.2em;

  a {
    text-decoration: underline;
    cursor: pointer;
  }

  text-align: center;
`;

const AboutWrapper = styled.div`
  max-width: 25%;
  overflow: wrap;
  font-size: 1.2em;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 0 2rem;
  }
`;

const LinkWrapper = styled(Link)``;

export default function Footer() {
  return (
    <FooterWrapper>
      <CreditsWrapper className={robotoMono.className}>
        <p>
          Site by <a href='https://willdunw.github.io/'>William Dunwoody</a>
        </p>
        <a href='mailto:williamdunwoody1@outlook.com'>Need a website?</a>
      </CreditsWrapper>
      <ContactWrapper>
        <p className={inter.className}>Questions or comments?</p>
        <IconWrapper>
          <Link href="https://www.instagram.com/healthyhaven.mtl/?utm_source=ig_web_button_share_sheet">
            <FaInstagram size={34} />
          </Link>
          {/* <SingleIconWrapper href="https://www.instagram.com/healthyhaven.mtl/?utm_source=ig_web_button_share_sheet">
            <FaFacebook size={34} />
          </SingleIconWrapper> */}
          {/* <SingleIconWrapper href="https://www.instagram.com/healthyhaven.mtl/?utm_source=ig_web_button_share_sheet">
            <MdEmail size={34} />
          </SingleIconWrapper> */}
          {/* <SingleIconWrapper href="https://www.instagram.com/healthyhaven.mtl/?utm_source=ig_web_button_share_sheet">
            <FaPhoneAlt size={28} />
          </SingleIconWrapper> */}
        </IconWrapper>
      </ContactWrapper>

      <AboutWrapper className={inter.className}>
        <p>
          <b>About this site:</b> <br /> This site was made as a personal
          project and is not the official Healthy Haven website. It is still a
          work in progress as new features are being added.
        </p>
      </AboutWrapper>
    </FooterWrapper>
  );
}
