import Head from 'next/head';
import Image from 'next/image';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import Layout from '../components/Layout';
// import data from '../utils/data';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/store';
export default function Home(props) {
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    // if (data.countInStockInStock <= 0) {
    //   window.alert('Sorry product is out of stock');
    //   return;
    // }
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
  };
  return (
    <>
      <Layout>
        <div>
          <h1> Products</h1>

          <Grid container spacing={3}>
            {products.map((product) => (
              <>
                <Grid item md={4} key={product.name}>
                  <Card>
                    {/* //! every thing int CardActionArea is clickable */}
                    <NextLink href={`/products/${product.slug}`} passHref>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={product.image}
                          title={product.name}
                        />
                        <CardContent>
                          <Typography variant="subtitle" color="initial">
                            {product.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </NextLink>
                    <CardActions>
                      <Typography>UGX {product.price}</Typography>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => addToCartHandler(product)}
                      >
                        Add To Chart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  //! the lean funciton is used to serializer the document from the mongodb
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
