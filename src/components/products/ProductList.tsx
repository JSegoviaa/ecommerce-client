import { FC } from 'react';
import { Grid } from '@mui/material';
import { ProductCard } from '.';
import { ProductsResp } from '../../interfaces';

interface Props {
  products: ProductsResp | undefined;
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products?.products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
