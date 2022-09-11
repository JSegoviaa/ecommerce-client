import { FC } from 'react';
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
import { Category } from '../../interfaces';

interface Props {
  category: Category;
}

const CategoryCard: FC<Props> = ({ category }) => {
  return (
    <Grid item xs={6} sm={3}>
      <Card>
        <NextLink
          href={`/productos/${category.slug}`}
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              <CardMedia component="img" src={category.url} />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: 'block' }}>
        <Typography fontWeight={700}>{category.title}</Typography>
      </Box>
    </Grid>
  );
};

export default CategoryCard;
