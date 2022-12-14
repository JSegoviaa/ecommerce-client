import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { AdminContext, AuthContext } from '../../../contexts';
import { useCategories } from '../../../hooks';
import {
  CategoriesResp,
  Data,
  NewSubcategory,
  Subcategory,
} from '../../../interfaces';
import { Loading } from '../../ui';
import { isAdminRole, isValidRole } from '../../../helpers';

interface Props {
  subcategory?: Subcategory;
}

type FormData = {
  title: string;
};

const SubcategoryForm: FC<Props> = ({ subcategory }) => {
  const { user } = useContext(AuthContext);
  const { addSubcategory, uploadSubcategoryPic, updateSubcategory } =
    useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(true);
  const [url, setUrl] = useState('');
  const [picture, setPicture] = useState<string | Blob>('');
  const [pictureId, setPictureId] = useState(0);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const router = useRouter();

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { title },
  });

  const query: Data = {
    order: 'title',
    sort: 'ASC',
    endpoint: 'categories/admin',
    is_published: true,
    is_active: true,
    from: 0,
    limit: 50,
  };

  const { data, isLoading: loading } = useCategories<CategoriesResp>(query);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsPublished(target.checked);
  };

  const onCategorySelected = ({ target }: SelectChangeEvent<string>) => {
    setCategoryId(target.value);
  };

  const onFileSelected = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;
    setUrl(URL.createObjectURL(target.files[0]));
    setPicture(target.files[0]);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append('picture', picture);

    if (router.query.id) {
      if (picture) {
        const uploadedPicture = await uploadSubcategoryPic(
          subcategory!.id,
          formData
        );

        if (uploadedPicture.ok) {
          const res = await updateSubcategory({
            ...subcategory!,
            title: data.title,
            updated_by: user!.id,
            image_id: uploadedPicture.uploadedPicture.id,
            is_published: isPublished,
            is_active: isActive,
            category_id: Number(categoryId),
          });

          setIsLoading(false);
          if (res.ok) router.push('/admin/subcategorias');
          return;
        }
      }

      if (!picture) {
        const res = await updateSubcategory({
          ...subcategory!,
          title: data.title,
          updated_by: user!.id,
          image_id: pictureId,
          is_published: isPublished,
          is_active: isActive,
          category_id: Number(categoryId),
        });

        if (!res.ok && res.msg) {
          alert(res.msg);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        if (res.ok) router.push('/admin/subcategorias');
        return;
      }

      return;
    }

    const newSubcategory: NewSubcategory = {
      title: data.title,
      category_id: Number(categoryId),
      created_by: user?.id,
      updated_by: user?.id,
      id: 1,
      image_id: 1,
      is_active: isActive,
      is_published: isPublished,
    };

    const res = await addSubcategory(newSubcategory);

    if (!res.ok && res.msg) {
      alert(res.msg);
      setIsLoading(false);
      return;
    }

    if (!res.ok) {
      setIsLoading(false);
      res.errors?.forEach((error) => alert(error.msg));

      return;
    }

    if (!res.ok && !res.errors) {
      setIsLoading(false);
      alert(res.msg);
      return;
    }

    if (res.ok) {
      const uploadedPicture = await uploadSubcategoryPic(
        res.newSubcategory!.id,
        formData
      );

      if (!uploadedPicture.ok) {
        setIsLoading(false);
        res.errors?.forEach((error) => alert(error.msg));

        return;
      }

      if (!uploadedPicture.ok && !uploadedPicture.errors) {
        setIsLoading(false);
        alert(uploadedPicture.msg);
        return;
      }

      const updatedSubcategory = await updateSubcategory({
        ...res.newSubcategory,
        image_id: uploadedPicture.uploadedPicture.id,
        is_active: isActive,
        is_published: isPublished,
      });

      if (updatedSubcategory.ok) {
        setIsLoading(false);
        alert('Subcategor??a creada con ??xito');
        router.replace('/admin/subcategorias');
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      reset(subcategory);
      setIsPublished(
        subcategory?.is_published ? subcategory?.is_published : false
      );
      setTitle(subcategory?.title ? subcategory?.title : '');
      setUrl(subcategory?.url ? subcategory.url : '');
      setPictureId(subcategory?.image_id ? subcategory.image_id : 0);
      setCategoryId(
        subcategory?.category_id ? String(subcategory.category_id) : ''
      );
      setIsActive(subcategory?.is_active ? subcategory.is_active : false);
    }
  }, [subcategory]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
          type="text"
          label="Nombre"
          {...register('title', {
            required: 'El nombre de la categor??a es obligatorio.',
          })}
          error={!!formState.errors.title}
          helperText={formState.errors.title?.message}
        />

        <br />
        <br />
        <Box>
          <Typography>
            {isPublished ? 'Despublicar producto' : 'Publicar producto'}
          </Typography>
          <Switch
            checked={isPublished}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>

        <Box>
          <Typography>
            {isActive ? 'Desactivar producto' : 'Activar producto'}
          </Typography>
          <Switch
            checked={isActive}
            onChange={({ target }) => setIsActive(target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>

        {url ? <Image src={url} width={250} height={250} /> : null}
        <br />
        <br />
        <Button variant="contained" component="label">
          {subcategory?.image_id ? 'Cambiar imagen' : 'Agregar imagen'}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onFileSelected}
          />
        </Button>
        <br />
        <br />

        {loading ? (
          'Cargando categor??as'
        ) : (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Categor??a</InputLabel>
            <Select
              onChange={onCategorySelected}
              value={categoryId}
              label="Categor??a"
            >
              {data?.categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <br />
        <br />

        {subcategory?.id ? (
          <Button
            type="submit"
            disabled={!formState.isValid || !url || !isValidRole(user?.role_id)}
            variant="contained"
          >
            Actualizar subcategor??a
          </Button>
        ) : (
          <Button
            disabled={
              !formState.isValid ||
              !picture ||
              !url ||
              !categoryId ||
              !isAdminRole(user?.role_id)
            }
            type="submit"
            variant="contained"
          >
            A??adir subcategor??a
          </Button>
        )}
      </form>
    </>
  );
};

export default SubcategoryForm;
