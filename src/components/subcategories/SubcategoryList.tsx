import { FC } from 'react';
import { Grid } from '@mui/material';
import { SubcategoriesResp } from '../../interfaces';
import SubcategoryCard from './SubcategoryCard';

interface Props {
  subcategories: SubcategoriesResp | undefined;
}

const CategoryList: FC<Props> = ({ subcategories }) => {
  return (
    <Grid container spacing={4}>
      {subcategories?.subcategories.map((subcategory) => (
        <SubcategoryCard key={subcategory.slug} subcategory={subcategory} />
      ))}
    </Grid>
  );
};

export default CategoryList;
