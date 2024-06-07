import TextField from '@mui/material/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-mui';
import React from 'react';

export default function MultilineTextField(props: TextFieldProps) {
  return <TextField {...fieldToTextField(props)} multiline minRows={10} />;
}
