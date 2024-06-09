import * as yup from 'yup';

export const CreateTopicSchema = yup.object().shape({
  title: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  categoryId: yup.string()
    .required(),
  cover: yup.mixed()
    .required('required')
    .test('fileFormat', 'Only JPEG or PNG are supported', (value: any) => {
      console.log(value);
      if (value) {
        const supportedFormats = ['image/jpeg', 'image/png'];
        return supportedFormats.includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 2MB', (value: any) => {
      if (value) {
        return value.size <= 2145728;
      }
      return true;
    }),
});
