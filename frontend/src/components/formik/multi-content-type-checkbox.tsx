import { ContentType } from "@/src/features/categories/categories.interfaces";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useMemo } from "react";

export interface MultiContentTypeCheckboxProps {
  name: string;
}

export default function MultiContentTypeCheckbox(props: MultiContentTypeCheckboxProps) {
  const { name } = props;
  const [field, meta, helpers] = useField(name);
  const { isSubmitting } = useFormikContext();

  const state = useMemo<Record<string, boolean>>(() => {
    const result = Object
      .values(ContentType)
      .reduce((p, value) => ({
        ...p,
        [value]: field.value?.includes(value),
      }), {});
    console.table(result);
    console.log(field.value);
    return result;
  }, [field.value]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field.value || [];
    const checked = event.target.checked;
    const name = event.target.name;

    // if is checked and it is not included already, then include.
    if (checked && field.value?.includes(name) === false) {
      helpers.setValue([...value, name]);
    }
    // else if is not checked remove from the array
    else if (!checked) {
      helpers.setValue(value.filter((it: string) => it !== name));
    }
  };

  return (
    <FormControl component="fieldset" disabled={isSubmitting} error={Boolean(meta.error && meta.touched)} >
      <FormLabel component="legend">Selected allowed content types</FormLabel>
      <FormGroup>
        {Object.entries(state).map(([key, checked]) => (
          <FormControlLabel
            label={key}
            onBlur={() => helpers.setTouched(true)}
            control={
              <Checkbox checked={checked} onChange={handleChange} name={key} />
            }
          />
        ))}
      </FormGroup>
      {Boolean(meta.error && meta.touched) && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  )
}
