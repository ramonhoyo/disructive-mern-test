import { MaxFileSize } from '@/src/helpers/consts';
import * as Yup from 'yup';

export const CreateEntryFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  content: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  urls: Yup
    .array()
    .of(Yup.string()
      .url()
      .required()
    ),
  topicId: Yup.string().required('Required'),
  images: Yup.array().of(Yup.mixed()
    .test('fileFormat', 'Only JPEG,PNG are supported', (value: any) => {
      if (value) {
        const supportedFormats = ['image/jpeg', 'image/png', 'text/plain'];
        return supportedFormats.includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 2MB', (value: any) => {
      if (value) {
        return value.size <= MaxFileSize;
      }
      return true;
    })),
  texts: Yup.array().of(Yup.mixed()
    .test('fileFormat', 'Only TXT is supported', (value: any) => {
      if (value) {
        const supportedFormats = ['text/plain'];
        return supportedFormats.includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 2MB', (value: any) => {
      if (value) {
        return value.size <= MaxFileSize;
      }
      return true;
    }))
});

