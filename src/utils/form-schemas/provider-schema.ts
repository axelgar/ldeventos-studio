import * as yup from 'yup';

export const ProviderSchema = yup.object().shape({
  name: yup.string().min(2, 'Name too short').max(50, 'Name too long').required('Name is required'),
  contactName: yup.string().min(2, 'Contact too short').max(100, 'Contact too long'),
  mobileNumber: yup.string().min(2, 'Mobile number too short').max(100, 'Mobile number too long'),
  phoneNumber: yup.string().min(2, 'Phone number too short').max(100, 'Phone number too long'),
  fax: yup.string().min(2, 'Fax too short').max(50, 'Fax too long'),
  email: yup.string().min(2, 'Email too short').max(100, 'Email too long'),
});
