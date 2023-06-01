import { ChangeEvent, FC, useContext, useState } from 'react';
import { TextField, Button, Switch, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateCategory } from '../../../interfaces';
import { AdminContext } from '../../../contexts';

const CategoriesForm: FC = () => {
  const { createCategory, uploadImages, updateCategory, getImage } =
    useContext(AdminContext);
  const [picture, setPicture] = useState<string | Blob>('');
  const [url, setUrl] = useState('');

  const { register, handleSubmit, formState } = useForm<CreateCategory>({
    mode: 'onChange',
  });

  const { isValid, errors } = formState;

  const onFileSelected = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;
    setUrl(URL.createObjectURL(target.files[0]));
    setPicture(target.files[0]);
  };

  const onSubmit = async (e: CreateCategory): Promise<void> => {
    const res = await createCategory(e);

    if (res !== 0) {
      const formData = new FormData();

      formData.append('image', picture);

      const resPicture = await uploadImages(formData);

      if (resPicture) {
        const imageId = await getImage(resPicture);
        const resUpdate = await updateCategory(res, { ...e, image: imageId });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Título"
          type="text"
          fullWidth
          autoComplete="off"
          {...register('title', {
            required: 'El título de la categoría es obligatorio.',
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <br />
        <br />
        <Typography>Publicar categoría</Typography>
        <Switch {...register('isPublished')} />
        <br />
        <br />
        <Typography>Activar categoría</Typography>
        <Switch {...register('isActive')} defaultChecked />
        <br />
        <br />
        {url ? <img src={url} width={250} height={250} /> : null}
        <Button variant="contained" component="label">
          Seleccionar imagen
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onFileSelected}
          />
        </Button>
        <br />
        <br />
        <Button disabled={!isValid} type="submit">
          Crear categoría
        </Button>
      </form>
    </>
  );
};

export default CategoriesForm;
