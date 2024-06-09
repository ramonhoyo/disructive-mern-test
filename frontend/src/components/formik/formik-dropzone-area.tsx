import { Alert } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { DropzoneArea } from 'react-mui-dropzone';

export default function FormikDropzoneArea({ name, ...props }: any) {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  const handleChange = (files: any) => {
    setFieldValue(name, files);
    helpers.setTouched(true);
  };

  return (
    <>
      <DropzoneArea {...field} {...props} onChange={handleChange} />
      {meta.touched && meta.error && (
        <Alert color='error' >{meta.error}</Alert>
      )}
    </>
  );
};

