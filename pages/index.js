import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import styled from "styled-components";
const Bg = styled.div`
  background-color: #ebe8e8;
`;

export default function HomePage({ featuredProduct, newProducts }) {
  
  return (
    <div>
      <p>test</p>
      {/* <Bg>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts newProducts={newProducts}/>
      </Bg> */}
    </div>
  );
}

// export async function getServerSideProps() {
//   // const featuredProductId = "6609b850d5d24d352556716e";
//   // await mongooseConnect();
//   // const featuredProduct = await Product.findById(featuredProductId);
//   // const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
//   // return {
//   //   props: {
//   //     featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
//   //     newProducts: JSON.parse(JSON.stringify(newProducts)),
//   //   },
//   // };
// }
