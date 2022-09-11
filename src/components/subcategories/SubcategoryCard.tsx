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
import { Subcategory } from '../../interfaces';

interface Props {
  subcategory: Subcategory;
}

const SubcategoryCard: FC<Props> = ({ subcategory }) => {
  const { query } = useRouter();

  return (
    <Grid item xs={6} sm={3}>
      <Card>
        <NextLink
          href={`/productos/${query.subcategories}/${subcategory.slug}`}
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              <CardMedia component="img" src={subcategory.url} />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: 'block' }}>
        <Typography fontWeight={700}>{subcategory.title}</Typography>
      </Box>
    </Grid>
  );
};

export default SubcategoryCard;
