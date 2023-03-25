import MainLayout from '@/components/MainLayout';
import { useCreatePromoter } from '@/hooks/useCreatePromoter';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { Input } from '@/components/Input';
import { PromoterSchema } from '@/utils/form-schemas/promoter-schema';
import { useToast } from '@/hooks/useToast';
import { CreatePromoterDTO } from '@/api/promoter/promoter.dto';

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

export default function AddPromoter() {
  const { toast } = useToast();
  const { mutate: createPromoter, isLoading } = useCreatePromoter({
    onSuccess: () => toast('Promoter added correctly', 'success'),
    onError: () => toast('There was an error trying to add the promoter', 'error'),
  });

  return (
    <MainLayout title="Add promoter">
      <Formik
        initialValues={{ name: '', address: '', code: '', phoneNumber: '', website: '' } as CreatePromoterDTO}
        validationSchema={PromoterSchema}
        onSubmit={(values, { resetForm }) => {
          createPromoter(values, { onSuccess: () => resetForm() });
        }}
      >
        {({ errors }) => (
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  label="Name"
                  disabled={isLoading}
                  errors={errors}
                />
                <Input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  label="Address"
                  disabled={isLoading}
                  errors={errors}
                />
                <Input
                  id="code"
                  name="code"
                  type="text"
                  autoComplete="code"
                  label="Code"
                  disabled={isLoading}
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
                  id="website"
                  name="website"
                  type="text"
                  autoComplete="website"
                  label="Website"
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
