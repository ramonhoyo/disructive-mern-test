import TextField from '@mui/material/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-mui';
import React from 'react';

export default function ImageInput(props: TextFieldProps) {
  const { form: { setFieldValue }, field: { name } } = props;

  const onChange = React.useCallback((event: any) => {
    let file = null;
    if (event.target.files) {
      file = event.target.files[0];
    }
    setFieldValue(name, file);
  }, [setFieldValue, name]);

  return <TextField
    {...fieldToTextField(props)}
    value={undefined}
    onChange={onChange}
    variant='standard'
    type="file"
    fullWidth
    inputProps={{ accept: 'image/png, image/jpeg' }}
  />;
}
