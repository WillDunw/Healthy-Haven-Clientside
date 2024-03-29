import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px){
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height:200px;
  }
  div:nth-child(1) {
    order:2;
  }
  div:nth-child(2) {
    text-align: center;
  }
  @media screen and (min-width:768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
    order:0;
  }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px
`;

export default function Featured({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id)
  }
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <div>
            <Title>{product.title}</Title>
            <Desc>
              {product.description}
            </Desc>
            <ButtonWrapper>
              <ButtonLink href={'/product/' + product._id} outline={1} white={1} >
                Read more
              </ButtonLink>
              <Button white onClick={addFeaturedToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonWrapper>
          </div>

          <div>
            <img src={product.images[0]}></img>
          </div>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
