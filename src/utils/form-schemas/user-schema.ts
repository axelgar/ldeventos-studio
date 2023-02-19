import { MAX_AVATAR_FILE_SIZE_IN_MB } from '@/constants';
import { Role } from '@prisma/client';
import * as yup from 'yup';
import { fileSizeInMb } from '../file-size-in-mb';
import { isValidAvatarFileType } from '../is-valid-avatar-file-type';
import { roundToTwoDecimals } from '../round-to-two-decimals';

export const UserSchema = yup.object().shape({
  name: yup.string().min(2, 'Name too short').max(50, 'Name too long').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.mixed<Role>().oneOf(Object.values(Role)),
  image: yup
    .mixed()
    .test('fileSize', 'This image is too big, please upload an image lower than 2MB', (value) => {
      if (!value) {
        return true;
      }
      return roundToTwoDecimals(fileSizeInMb(value)) <= MAX_AVATAR_FILE_SIZE_IN_MB;
    })
    .test('fileFormat', 'This type is not allowed, please upload an image', (value) => {
      if (!value) {
        return true;
      }
      return isValidAvatarFileType(value);
    }),
  mobileNumber: yup.string().min(2, 'Mobile number too short').max(15, 'Mobile number too long'),
});
