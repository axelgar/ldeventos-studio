import MainLayout from '@/components/MainLayout';
import { useUpdatePromoter } from '@/hooks/useUpdatePromoter';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { Input } from '@/components/Input';
import { PromoterSchema } from '@/utils/form-schemas/promoter-schema';
import { useToast } from '@/hooks/useToast';
import { UpdatePromoterDTO } from '@/api/promoter/promoter.dto';
import { useRouter } from 'next/router';
import { useGetPromoterById } from '@/hooks/useGetPromoterById';
import { PageSpinner } from '@/components/PageSpinner';
import { ChangeEvent, useEffect, useState } from 'react';
import { MAX_PROMOTER_LOGO_FILE_SIZE_IN_MB } from '@/constants';
import { isValidImageFileType } from '@/utils/is-valid-image-file-type';
import { roundToTwoDecimals } from '@/utils/round-to-two-decimals';
import { fileSizeInMb } from '@/utils/file-size-in-mb';
import { useUploadPromoterLogo } from '@/hooks/useUploadPromoterLogo';
import { useGetPromoterLogoUploadUrl } from '@/hooks/useGetPromoterLogoUploadUrl';

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

export default function UpdatePromoter() {
  const [logoFile, setLogoFile] = useState<File>();
  const { toast } = useToast();
  const router = useRouter<'/home/promoters/[promoterId]/update'>();
  const { promoterId } = router.query;
  const { data: promoter, isLoading } = useGetPromoterById(promoterId);
  const { mutate: updatePromoter, isLoading: isUpdateLoading } = useUpdatePromoter(promoterId, {
    onSuccess: () => toast('Promoter updated correctly', 'success'),
    onError: () => toast('There was an error trying to update the promoter', 'error'),
  });
  const { mutate: uploadPromoterLogo, isLoading: isUploadLoading } = useUploadPromoterLogo({
    onSuccess: (publicUrl) => updatePromoter({ id: promoterId, logo: publicUrl }),
  });
  const { mutate: getPromoterLogoUploadUrl } = useGetPromoterLogoUploadUrl(promoterId, {
    onSuccess: async ({ uploadUrl }) => {
      try {
        if (!logoFile) {
          return;
        }
        uploadPromoterLogo({ uploadUrl, logoFile });
      } catch (error) {
        //TODO manage error
      }
    },
  });

  useEffect(() => {
    if (!logoFile) {
      return;
    }
    getPromoterLogoUploadUrl(logoFile.name);
  }, [logoFile, getPromoterLogoUploadUrl]);

  return (
    <MainLayout title="Update promoter">
      {isLoading ? (
        <PageSpinner />
      ) : (
        <Formik
          initialValues={
            {
              name: promoter?.name || '',
              address: promoter?.address || '',
              code: promoter?.code || '',
              phoneNumber: promoter?.phoneNumber || '',
              website: promoter?.website || '',
            } as Omit<UpdatePromoterDTO, 'id'>
          }
          validationSchema={PromoterSchema}
          onSubmit={(values) => {
            updatePromoter({ id: promoterId, ...values });
          }}
        >
          {({ errors, setFieldValue, setFieldError }) => (
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

                  <div className="sm:col-span-6">
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                      Logo
                    </label>
                    <div className="mt-1 flex items-center">
                      {promoter?.logo ? <img className="h-auto w-20 object-cover" src={promoter?.logo} alt="" /> : null}
                      <Field
                        onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                          const file = event.target.files?.[0];
                          if (!file) {
                            return;
                          }

                          setFieldValue('logo', file);
                          if (!isValidImageFileType(file)) {
                            return;
                          }

                          if (roundToTwoDecimals(fileSizeInMb(file)) > MAX_PROMOTER_LOGO_FILE_SIZE_IN_MB) {
                            return;
                          }

                          setFieldError('logo', undefined);
                          setLogoFile(file);
                        }}
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        disabled={isUpdateLoading || isUploadLoading}
                        value={undefined}
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
