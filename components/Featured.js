import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import {Inter, Rubik, Roboto_Mono} from "next/font/google";

const robotoMono = Roboto_Mono({subsets: ["latin"], weight:"500"});
const inter = Inter({subsets: ["latin"], weight:"500"});
const rubik = Rubik({subsets:["latin"], weight:"500"});

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 1rem 5rem 0 5rem;
  max-height: 25rem;

  @media screen and (max-width: 768px) {
    max-height: 80vw;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  max-width: 35rem;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;

  img {
    max-width: 100%;
    height: 100%;
  }
  div:nth-child(1) {
    order: 2;
  }
  div:nth-child(2) {
    text-align: center;
  }
  @media screen and (min-width: 768px) {
    display: grid;
    gap: 40px;
    max-height: 60%;
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const DescriptionWrapper = styled.div`
  max-height: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media screen and (max-width:768px) {
    padding-bottom:2rem;
    padding-top:5px;
  }
`;

const ImageWrapper = styled.div`
  max-height: 60%;

  @media screen and (max-width: 768px) {
    img {
      max-height: 200px;
    }
  }
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <DescriptionWrapper>
            <Title className={rubik.className}>{product?.title}</Title>
            <Desc className={inter.className}>{product?.description}</Desc>
            <ButtonWrapper>
              <ButtonLink
                href={"/product/" + product?._id}
                outline={1}
                white={1}
              >
                Learn more
              </ButtonLink>
              <Button className={inter.className} white onClick={addFeaturedToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonWrapper>
          </DescriptionWrapper>

          <ImageWrapper>
            <img src={product?.images[0]}></img>
          </ImageWrapper>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
