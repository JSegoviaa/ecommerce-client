import { FC } from 'react';
import { Grid } from '@mui/material';

import { CategoriesResp } from '../../interfaces';
import CategoryCard from './CategoryCard';

interface Props {
  categories: CategoriesResp | undefined;
}

const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <Grid container spacing={4}>
      {categories?.categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Grid>
  );
};

export default CategoryList;
