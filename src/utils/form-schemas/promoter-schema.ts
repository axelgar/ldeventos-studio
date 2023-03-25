import { MAX_PROMOTER_LOGO_FILE_SIZE_IN_MB } from '@/constants';
import * as yup from 'yup';
import { fileSizeInMb } from '../file-size-in-mb';
import { isValidImageFileType } from '../is-valid-image-file-type';
import { roundToTwoDecimals } from '../round-to-two-decimals';

export const PromoterSchema = yup.object().shape({
  name: yup.string().min(2, 'Name too short').max(50, 'Name too long').required('Name is required'),
  address: yup.string().min(5, 'Address too short').max(100, 'Address too long'),
  code: yup.string().min(2, 'Code too short').max(100, 'Code too long'),
  phoneNumber: yup.string().min(2, 'Phone number too short').max(100, 'Phone number too long'),
  website: yup.string().url(),
  logo: yup
    .mixed<File>()
    .test('fileSize', 'This image is too big, please upload an image lower than 2MB', (value) => {
      if (!value) {
        return true;
      }
      return roundToTwoDecimals(fileSizeInMb(value)) <= MAX_PROMOTER_LOGO_FILE_SIZE_IN_MB;
    })
    .test('fileFormat', 'This type is not allowed, please upload an image', (value) => {
      if (!value) {
        return true;
      }
      return isValidImageFileType(value);
    }),
});
