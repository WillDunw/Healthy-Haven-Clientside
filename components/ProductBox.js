import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import {Inter, Rubik, Roboto_Mono} from "next/font/google";

const robotoMono = Roboto_Mono({subsets: ["latin"], weight:"500"});
const inter = Inter({subsets: ["latin"], weight:"500"});
const rubik = Rubik({subsets:["latin"], weight:"500"});

const ProductWrapper = styled.div`
max-width: 250px;
`;

const WhiteBox = styled(Link)`
  background-color: #f4f0f0;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1.1rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    font-weight: 500;

    @media screen and (max-width:945px) {
      font-size:1.1rem;
    }
`;

export default function ProductBox({ _id, title, description, price, images }) {
    const url = "/product/" + _id;
    const {addProduct} = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url} className={rubik.className}>{title}</Title>
        <PriceRow>
          <Price className={robotoMono.className}>${price.toFixed(2)}</Price>
          <div>
            <Button className={inter.className} primary outline onClick={() => addProduct(_id)}>
              Add to cart
              <CartIcon />
            </Button>
          </div>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
