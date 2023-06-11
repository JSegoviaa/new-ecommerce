import { ChangeEvent, FC, useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Typography, Switch, Button } from '@mui/material';
import { isValidRole } from '../../../helpers';
import { AdminContext, AuthContext } from '../../../contexts';
import { CreatedInfo } from '../../ui';
import { Subcategory } from '../../../interfaces';

const SubcategoriesForm: FC = () => {
  const { user } = useContext(AuthContext);
  const { subcategories } = useContext(AdminContext);
  const [picture, setPicture] = useState<string | Blob>('');
  const [url, setUrl] = useState('');
  const [subcategory, setSubcategory] = useState<Subcategory>();
  const [isEditSubcategory, setIsEditSubcategory] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
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
  const isValidAdminRole = isValidRole(user?.role.id);

  const onSubmit = async (): Promise<void> => {};

  useEffect(() => {
    if (params.id) {
      setIsEditSubcategory(true);
      const subcategory = subcategories.subcategories.find(
        (subcategory) => subcategory.id === Number(params.id)
      );
      const subcategoryUrl = subcategories.subcategories.find(
        (subcategory) => subcategory.id === Number(params.id)
      )?.image.url;
      const isActive = subcategories.subcategories.find(
        (subcategory) => subcategory.id === Number(params.id)
      )?.isActive;
      const isPublished = subcategories.subcategories.find(
        (subcategory) => subcategory.id === Number(params.id)
      )?.isPublished;
      setSubcategory(subcategory);
      setUrl(subcategoryUrl ? subcategoryUrl : '');
      setIsActive(isActive ? isActive : false);
      setIsPublished(isPublished ? isPublished : false);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Título"
          type="text"
          fullWidth
          autoComplete="off"
          {...register('title', {
            required: 'El título de la categoría es obligatorio.',
          })}
          error={!!errors.title}
          //   helperText={errors.title?.message}
        />
        <br />
        <br />
        <Typography>
          {isPublished ? 'Ocultar subcategoría' : 'Publicar subcategoría'}
        </Typography>
        <Switch
          checked={isPublished}
          {...register('isPublished')}
          onChange={handleChange}
        />
        <br />
        <br />
        <Typography>
          {isActive ? 'Desactivar subcategoría' : 'Activar ssubcategoría'}
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
          {isEditSubcategory ? 'Actualizar imagen' : 'Seleccionar imagen'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onFileSelected}
          />
        </Button>
        <br />
        <br />
        {isValidAdminRole ? (
          <Button
            disabled={!isValid || !url || !isValidAdminRole}
            type="submit"
          >
            {isEditSubcategory
              ? 'Actualizar subcategoría'
              : 'Crear subcategoría'}
          </Button>
        ) : null}

        {isEditSubcategory ? (
          <CreatedInfo
            type="Categoría"
            action1="creada"
            action2="actualizada"
            createdAt={subcategory!.createdAt}
            updatedAt={subcategory!.updatedAt}
            firstName={subcategory?.createdBy.firstName}
            lastName={subcategory?.createdBy.lastName}
          />
        ) : null}
      </form>
    </>
  );
};

export default SubcategoriesForm;
