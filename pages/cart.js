import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {Inter, Rubik, Roboto_Mono} from "next/font/google";

const robotoMono = Roboto_Mono({subsets: ["latin"], weight:"500"});
const inter = Inter({subsets: ["latin"], weight:"500"});
const rubik = Rubik({subsets:["latin"], weight:"500"});

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media screen and (min-width: 768px) {
    padding: 10px;
    img {
    max-width: 80px;
    max-height: 80px;
  }
  width: 100px;
  height: 100px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 13px;
  display:block;
  @media screen and (min-width: 768px) {
    display:inline-block;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage(props) {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const searchParams = useSearchParams();
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (searchParams.get('success')) {
      clearCart();
    }
  }, []);

  function addAnotherProduct(id) {
    addProduct(id);
  }
  function lessOfProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      streetAddress,
      postalCode,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  if (searchParams.get('success')) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Payment success, thanks for your order!</h1>
              <p>We will email you shortly with the details</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2 className={rubik.className}>Cart</h2>
            {!cartProducts?.length && <div className={inter.className}>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th className={robotoMono.className}>Product</th>
                    <th className={robotoMono.className}>Quantity</th>
                    <th className={robotoMono.className}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell className={rubik.className}>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel className={inter.className}>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => addAnotherProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td className={robotoMono.className}>
                        $
                        {(cartProducts.filter((id) => id === product._id)
                          .length * product.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td className={robotoMono.className}>Total: ${total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2 className={rubik.className}>Order Details</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button block primary onClick={goToPayment}>
                Continue to checkout
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
