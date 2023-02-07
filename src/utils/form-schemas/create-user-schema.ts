import { Role } from '@prisma/client';
import * as yup from 'yup';

export const CreateUserSchema = yup.object().shape({
  name: yup.string().min(2, 'Name too short').max(50, 'Name too long').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.mixed<Role>().oneOf(Object.values(Role)),
  image: yup.mixed(),
  // .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
  // .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
  mobileNumber: yup.string().min(2, 'Mobile number too short').max(15, 'Mobile number too long'),
});
