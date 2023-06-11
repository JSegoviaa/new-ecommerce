import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { TextField, Button, Switch, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { CreateCategory } from '../../../interfaces';
import { AdminContext } from '../../../contexts';
import { Category } from '../../../interfaces/categories';
import { CreatedInfo } from '../../ui/info';

const CategoriesForm: FC = () => {
  const {
    createCategory,
    uploadImages,
    updateCategory,
    getImage,
    categories,
    dispatch,
  } = useContext(AdminContext);
  const [picture, setPicture] = useState<string | Blob>('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<Category>();
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, formState } = useForm<CreateCategory>({
    mode: 'onChange',
    values: {
      isActive: category?.isActive ? category.isActive : false,
      isPublished: category?.isPublished ? category.isPublished : true,
      title: category?.title ? category.title : '',
      image: category?.image.id ? category.image.id : 1,
    },
  });

  const { isValid, errors } = formState;

  const onFileSelected = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    if (!target.files || target.files.length === 0) return;
    setUrl(URL.createObjectURL(target.files[0]));
    setPicture(target.files[0]);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    switch (target.name) {
      case 'isPublished':
        setIsPublished(target.checked);
        break;
      case 'isActive':
        setIsActive(target.checked);
        break;

      default:
        break;
    }
  };

  const onSubmit = async (e: CreateCategory): Promise<void> => {
    if (isEditCategory) {
      if (picture) {
        const formData = new FormData();

        formData.append('image', picture);

        const resPicture = await uploadImages(formData);

        if (resPicture) {
          const imageId = await getImage(resPicture);
          const resUpdate = await updateCategory(category!.id, {
            ...e,
            image: imageId,
          });
          if (resUpdate) navigate('/categorias');
          dispatch({
            type: 'Admin - Open Message',
            payload: 'La categoría se ha actualizado correctamente',
          });
          return;
        }
      }

      await updateCategory(category!.id, {
        isActive: isActive,
        isPublished: isPublished,
        title: e.title,
        image: category?.image.id,
      });
      navigate('/categorias');
      dispatch({
        type: 'Admin - Open Message',
        payload: 'La categoría se ha actualizado correctamente',
      });
      return;
    }

    const res = await createCategory(e);

    if (res !== 0) {
      const formData = new FormData();

      formData.append('image', picture);

      const resPicture = await uploadImages(formData);

      if (resPicture) {
        const imageId = await getImage(resPicture);
        const resUpdate = await updateCategory(res, { ...e, image: imageId });
        if (resUpdate) navigate('/categorias');
        dispatch({
          type: 'Admin - Open Message',
          payload: 'La categoría se ha creado correctamente',
        });
        return;
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      setIsEditCategory(true);
      const category = categories.categories.find(
        (category) => category.id === Number(params.id)
      );
      const categoryUrl = categories.categories.find(
        (category) => category.id === Number(params.id)
      )?.image.url;
      const isActive = categories.categories.find(
        (category) => category.id === Number(params.id)
      )?.isActive;
      const isPublished = categories.categories.find(
        (category) => category.id === Number(params.id)
      )?.isPublished;
      setCategory(category);
      setUrl(categoryUrl ? categoryUrl : '');
      setIsActive(isActive ? isActive : false);
      setIsPublished(isPublished ? isPublished : false);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Título"
          type="text"
          fullWidth
          focused={category?.title ? true : false}
          autoComplete="off"
          {...register('title', {
            required: 'El título de la categoría es obligatorio.',
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <br />
        <br />
        <Typography>
          {isPublished ? 'Ocultar categoría' : 'Publicar categoría'}
        </Typography>
        <Switch
          checked={isPublished}
          {...register('isPublished')}
          onChange={handleChange}
        />
        <br />
        <br />
        <Typography>
          {isActive ? 'Desactivar categoría' : 'Activar categoría'}
        </Typography>
        <Switch
          checked={isActive}
          {...register('isActive')}
          onChange={handleChange}
        />
        <br />
        <br />
        {url ? <img src={url} width={250} height={250} /> : null}
        <br />
        <Button variant="contained" component="label">
          {isEditCategory ? 'Actualizar imagen' : 'Seleccionar imagen'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onFileSelected}
          />
        </Button>
        <br />
        <br />
        <Button disabled={!isValid || !picture} type="submit">
          {isEditCategory ? 'Actualizar categoría' : 'Crear categoría'}
        </Button>
      </form>
      {isEditCategory ? (
        <CreatedInfo
          type="Categoría"
          action1="creada"
          action2="actualizada"
          createdAt={category!.createdAt}
          updatedAt={category!.updatedAt}
          firstName={category?.createdBy.firstName}
          lastName={category?.createdBy.lastName}
        />
      ) : null}
    </>
  );
};

export default CategoriesForm;
