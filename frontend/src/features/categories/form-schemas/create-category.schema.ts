import * as yup from 'yup';
import { ContentType } from '../categories.interfaces';

export const CreateCategorySchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  contentTypes: yup.array()
    .of(yup.string().oneOf(Object.values(ContentType)))
    .min(1, 'Select at least one')
    .required('Required'),
});
