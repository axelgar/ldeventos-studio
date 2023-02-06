import MainLayout from '@/components/MainLayout';
import { useCreateOne } from '@/hooks/useCreateUser';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { CreateUserDTO } from '@/api/user/user.dto';
import { Role } from '@prisma/client';
import * as yup from 'yup';
import { Input } from '@/components/Input';

const CreateUserSchema = yup.object().shape({
  name: yup.string().min(2, 'Name too short').max(50, 'Name too long').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.mixed<Role>().oneOf(Object.values(Role)),
  image: yup.mixed(),
  // .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
  // .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
  mobileNumber: yup.string().min(2, 'Mobile number too short').max(15, 'Mobile number too long'),
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  invariant(session);

  if (session.user.role === 'EXTERNAL') {
    return {
      redirect: {
        permanent: false,
        destination: process.env.NEXT_PUBLIC_APP_DOMAIN,
      },
    };
  }

  return { props: {} };
}

export default function Team() {
  const { mutate: createUser } = useCreateOne({ onSuccess: console.log });
  return (
    <MainLayout title="Add user">
      <Formik
        initialValues={{ email: '', name: '', mobileNumber: '', role: 'EXTERNAL', image: '' } as CreateUserDTO}
        validationSchema={CreateUserSchema}
        onSubmit={async (values) => {
          await createUser(values);
        }}
      >
        {({ errors }) => (
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Email address"
                  errors={errors}
                />
                <Input id="name" name="name" type="text" autoComplete="name" label="Name" errors={errors} />
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  autoComplete="mobileNumber"
                  label="Mobile phone number"
                  errors={errors}
                />

                <div className="sm:col-span-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Field
                      id="role"
                      name="role"
                      as="select"
                      className={
                        errors.role
                          ? 'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                          : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm'
                      }
                    >
                      <option value="EXTERNAL">External</option>
                      <option value="MEMBER">Member</option>
                      <option value="ADMIN">Admin</option>
                    </Field>
                  </div>
                  <ErrorMessage name="role">
                    {(message) => (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {message}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <Field
                      id="image"
                      name="image"
                      type="file"
                      className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    />
                  </div>
                  <ErrorMessage name="image">
                    {(message) => (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {message}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
}
