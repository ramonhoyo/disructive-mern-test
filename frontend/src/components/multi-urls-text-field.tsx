import React from 'react';
import { Button, Box, InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, FieldArray, useField } from 'formik';
import { TextField } from 'formik-mui';

const MultiUrlsTextField = (props: any) => {
  const [field] = useField(props.name);


  return (
    <div>
      <FieldArray
        name={props.name}
        render={arrayHelpers => (
          <>
            {field.value.map((_: any, index: number) => (
              <Field
                component={TextField}
                fullWidth
                name={`${props.name}.${index}`}
                label='Video URL'
                sx={{ flex: 1, mt: 2 }}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="end" >
                      <IconButton
                        aria-label="remove"
                        onClick={() => arrayHelpers.remove(index)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                }}
              />
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button sx={{ mt: 4 }} variant="contained" onClick={() => arrayHelpers.push('')}>Add URL</Button>
            </Box>
          </>
        )}
      />
    </div>
  );
};

export default MultiUrlsTextField;

