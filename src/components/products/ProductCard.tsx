import { FC } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { Product } from '../../interfaces';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { query } = useRouter();

  return (
    <Grid item xs={6} sm={3}>
      <Card>
        <NextLink
          href={`/productos/${query.subcategories}/${query.products}/${product.slug}`}
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              <CardMedia component="img" src={product.url} />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: 'block' }}>
        <Typography fontWeight={700}>{product.title}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;
