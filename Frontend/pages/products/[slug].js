import React, { useContext } from 'react';
// import { useRouter } from 'next/router';
// import data from '../../utils/data';
import axios from 'axios';
import {
  Link,
  Grid,
  ListItem,
  List,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import NextLink from 'next/link';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/store';
import { Router, useRouter } from 'next/router';

function ProductScreen(props) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { product } = props;

  // const router = useRouter();
  const classes = useStyles();
  // const { slug } = router.query;
  // const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div> Product Not Found</div>;
  }
  //! makeing an ajax request to db
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStockInStock <= 0) {
      window.alert('Sorry product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>back to prodcuts</Link>
        </NextLink>
      </div>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1" color="initial">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="initial">
                Category :{product.category}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="initial">Brand:{product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography color="initial">
                Rating:{product.rating} star ({product.numReviews} reviews
              </Typography>
              )
            </ListItem>
            <ListItem>
              Description:
              <Typography color="initial">{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography color="initial">Price</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="initial">UGX{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography color="initial">Status</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="initial">
                      {product.countInStock > 0 ? 'Instock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to Chart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
