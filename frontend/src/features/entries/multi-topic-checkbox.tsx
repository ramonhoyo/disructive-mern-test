import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useMemo } from "react";
import useTopics from "../topics/use-topics";

export interface MultiTopicCheckboxProps {
  name: string;
  value: string[];
  setValue: (it: string[]) => void;
}

export default function MultiTopicCheckbox(props: MultiTopicCheckboxProps) {
  const { value, setValue } = props;
  const { data: topics } = useTopics();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let array = value || [];
    const checked = event.target.checked;
    const name = event.target.name;

    // if is checked and it is not included already, then include.
    if (checked && array.includes(name) === false) {
      setValue([...array, name]);
    }
    // else if is not checked remove from the array
    else if (!checked) {
      setValue(array.filter((it: string) => it !== name));
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filter by topics</FormLabel>
      <FormGroup>
        {topics?.map((topic) => (
          <FormControlLabel
            label={topic.title}
            control={
              <Checkbox
                checked={value.includes(topic.id)}
                onChange={handleChange}
                name={topic.id}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}
