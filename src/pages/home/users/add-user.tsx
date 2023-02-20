import MainLayout from '@/components/MainLayout';
import { useCreateOne } from '@/hooks/useCreateUser';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { CreateUserDTO } from '@/api/user/user.dto';
import { Input } from '@/components/Input';
import { UserSchema } from '@/utils/form-schemas/user-schema';
import { useToast } from '@/hooks/useToast';

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
  const { toast } = useToast();
  const { mutate: createUser, isLoading } = useCreateOne({
    onSuccess: () => toast('User added correctly', 'success'),
    onError: () => toast('There was an error trying to add the user', 'error'),
  });

  return (
    <MainLayout title="Add user">
      <Formik
        initialValues={{ email: '', name: '', mobileNumber: '', role: 'EXTERNAL', image: '' } as CreateUserDTO}
        validationSchema={UserSchema}
        onSubmit={(values, { resetForm }) => {
          createUser(values, { onSuccess: () => resetForm() });
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
                  disabled={isLoading}
                  errors={errors}
                />
                <Input id="name" name="name" type="text" autoComplete="name" label="Name" errors={errors} />
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  autoComplete="mobileNumber"
                  label="Mobile phone number"
                  disabled={isLoading}
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
                      disabled={isLoading}
                      className={
                        errors.role
                          ? 'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                          : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300 sm:text-sm'
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
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
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
