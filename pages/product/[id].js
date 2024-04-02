import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";
import { Inter, Rubik, Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "500" });
const inter = Inter({ subsets: ["latin"], weight: "500" });
const rubik = Rubik({ subsets: ["latin"], weight: "500" });

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.6rem;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 75%;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImagesWrapper = styled.div`
  width: 60%;
  margin-left: 25%;
  min-width:240px;

`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <ImagesWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
          </ImagesWrapper>
          <DetailsWrapper>
            <Title className={rubik.className}>{product.title}</Title>
            <p className={inter.className}>{product.description}</p>
            <PriceRow>
              <Price className={robotoMono.className}>
                ${product.price.toFixed(2)}
              </Price>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </DetailsWrapper>
        </ColumnsWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
