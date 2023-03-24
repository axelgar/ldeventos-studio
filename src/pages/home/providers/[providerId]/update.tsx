import MainLayout from '@/components/MainLayout';
import { useUpdateProvider } from '@/hooks/useUpdateProvider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { Input } from '@/components/Input';
import { ProviderSchema } from '@/utils/form-schemas/provider-schema';
import { useToast } from '@/hooks/useToast';
import { UpdateProviderDTO } from '@/api/provider/provider.dto';
import { useRouter } from 'next/router';
import { useGetProviderById } from '@/hooks/useGetProviderById';
import { PageSpinner } from '@/components/PageSpinner';

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

export default function UpdateProvider() {
  const { toast } = useToast();
  const router = useRouter<'/home/providers/[providerId]/update'>();
  const { providerId } = router.query;
  const { data: provider, isLoading } = useGetProviderById(providerId);
  const { mutate: updateProvider, isLoading: isUpdateLoading } = useUpdateProvider(providerId, {
    onSuccess: () => toast('Provider updated correctly', 'success'),
    onError: () => toast('There was an error trying to update the provider', 'error'),
  });

  return (
    <MainLayout title="Update provider">
      {isLoading ? (
        <PageSpinner />
      ) : (
        <Formik
          initialValues={
            {
              email: provider?.email || '',
              name: provider?.name || '',
              mobileNumber: provider?.mobileNumber || '',
              phoneNumber: provider?.phoneNumber || '',
              fax: provider?.fax || '',
              contactName: provider?.contactName || '',
            } as Omit<UpdateProviderDTO, 'id'>
          }
          validationSchema={ProviderSchema}
          onSubmit={(values) => {
            updateProvider({ id: providerId, ...values });
          }}
        >
          {({ errors }) => (
            <Form className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <Input id="name" name="name" type="text" autoComplete="name" label="Name" errors={errors} />
                  <Input
                    id="contactName"
                    name="contactName"
                    type="text"
                    autoComplete="contactName"
                    label="Contact"
                    errors={errors}
                  />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    autoComplete="phoneNumber"
                    label="Phone number"
                    disabled={isLoading}
                    errors={errors}
                  />
                  <Input
                    id="fax"
                    name="fax"
                    type="text"
                    autoComplete="fax"
                    label="Fax"
                    disabled={isLoading}
                    errors={errors}
                  />
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    autoComplete="mobileNumber"
                    label="Mobile phone number"
                    disabled={isLoading}
                    errors={errors}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    label="Email address"
                    disabled={isLoading}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </MainLayout>
  );
}
