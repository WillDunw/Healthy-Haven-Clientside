import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 15px 0px 15px 0;
`;

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>Best Sellers</Title>
      <ProductsGrid products={newProducts} />
    </Center>
  );
}
