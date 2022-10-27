import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Switch, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AdminContext, AuthContext } from '../../../contexts';
import { Category, CreateCategory } from '../../../interfaces';
import { Loading } from '../../ui';
import { isAdminRole, isValidRole } from '../../../helpers';

interface Props {
  category?: Category;
}

type FormData = {
  title: string;
};

const CategoryForm: FC<Props> = ({ category }) => {
  const { user } = useContext(AuthContext);
  const { addCategory, updateCategory, uploadCategoryPic } =
    useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(true);
  const [picture, setPicture] = useState<string | Blob>('');
  const [pictureId, setPictureId] = useState(0);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const router = useRouter();

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { title },
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsPublished(target.checked);
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
        const uploadedPicture = await uploadCategoryPic(category!.id, formData);

        if (uploadedPicture.ok) {
          const res = await updateCategory({
            ...category!,
            title: data.title,
            updated_by: user!.id,
            image_id: uploadedPicture.uploadedPicture.id,
            is_published: isPublished,
            is_active: isActive,
          });

          setIsLoading(false);
          if (res.ok) router.push('/admin/categorias');
          return;
        }
      }

      if (!picture) {
        const res = await updateCategory({
          ...category!,
          title: data.title,
          updated_by: user!.id,
          image_id: pictureId,
          is_published: isPublished,
          is_active: isActive,
        });

        if (!res.ok && res.msg) {
          alert(res.msg);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        if (res.ok) router.push('/admin/categorias');
        return;
      }

      return;
    }

    const newCategory: CreateCategory = {
      title: data.title,
      updated_by: user!.id,
      created_by: user!.id,
    };

    const res = await addCategory(newCategory);

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
      const uploadedPicture = await uploadCategoryPic(
        res.newCategory!.id,
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

      const updatedCategory = await updateCategory({
        ...res.newCategory,
        image_id: uploadedPicture.uploadedPicture?.id,
        is_published: isPublished,
      });

      if (updatedCategory.ok) {
        setIsLoading(false);
        alert('Categoría creada con éxito');
        router.replace('/admin/categorias');
      }
    }
  };

  useEffect(() => {
    if (router.query.id) {
      reset(category);
      setIsPublished(category?.is_published ? category?.is_published : false);
      setTitle(category?.title ? category?.title : '');
      setUrl(category?.url ? category.url : '');
      setPictureId(category?.image_id ? category.image_id : 0);
      setIsActive(category?.is_active ? category.is_active : false);
    }
  }, [category]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        {!category && router.query.id ? (
          <Loading />
        ) : (
          <>
            <TextField
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              type="text"
              label="Nombre"
              {...register('title', {
                required: 'El nombre de la categoría es obligatorio.',
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
              {category?.image_id ? 'Cambiar imagen' : 'Agregar imagen'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onFileSelected}
              />
            </Button>
            <br />
            <br />

            {category?.id ? (
              <Button
                type="submit"
                disabled={
                  !formState.isValid || !url || !isValidRole(user?.role_id)
                }
                variant="contained"
              >
                Actualizar categoría
              </Button>
            ) : (
              <Button
                disabled={
                  !formState.isValid ||
                  !picture ||
                  !url ||
                  !isAdminRole(user?.role_id)
                }
                type="submit"
                variant="contained"
              >
                Añadir categoría
              </Button>
            )}
          </>
        )}
      </form>
    </>
  );
};

export default CategoryForm;
