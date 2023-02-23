import MainLayout from '@/components/MainLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { UpdateUserDTO } from '@/api/user/user.dto';
import { Input } from '@/components/Input';
import { UserSchema } from '@/utils/form-schemas/user-schema';
import { useRouter } from 'next/router';
import { useGetUserById } from '@/hooks/useGetUserById';
import { PageSpinner } from '@/components/PageSpinner';
import { isValidAvatarFileType } from '@/utils/is-valid-avatar-file-type';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetAvatarUploadUrl } from '@/hooks/useGetAvatarUploadUrl';
import { useUpdateUserById } from '@/hooks/useUpdateUserById';
import { AvatarPlaceholder } from '@/components/AvatarPlaceholder';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import { fileSizeInMb } from '@/utils/file-size-in-mb';
import { MAX_AVATAR_FILE_SIZE_IN_MB } from '@/constants';
import { roundToTwoDecimals } from '@/utils/round-to-two-decimals';
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
  const [avatarFile, setAvatarFile] = useState<File>();
  const router = useRouter<'/home/users/[userId]/update'>();
  const { userId } = router.query;
  const { toast } = useToast();
  const { data: user, isLoading } = useGetUserById(userId);
  const { mutate: updateUser, isLoading: isUpdateLoading } = useUpdateUserById(userId, {
    onSuccess: () => toast('User updated correctly', 'success'),
    onError: () => toast('There was an error updating the user', 'error'),
  });
  const { mutate: uploadAvatar, isLoading: isUploadLoading } = useUploadAvatar({
    onSuccess: (publicUrl) => updateUser({ id: userId, image: publicUrl }),
  });

  const { mutate: getAvatarUploadUrl } = useGetAvatarUploadUrl(userId, {
    onSuccess: async ({ uploadUrl }) => {
      try {
        if (!avatarFile) {
          return;
        }
        uploadAvatar({ uploadUrl, avatarFile });
      } catch (error) {
        //TODO manage error
      }
    },
  });

  useEffect(() => {
    if (!avatarFile) {
      return;
    }
    getAvatarUploadUrl(avatarFile.name);
  }, [avatarFile, getAvatarUploadUrl]);

  return (
    <MainLayout title="Update user">
      {isLoading ? (
        <PageSpinner />
      ) : (
        <Formik
          initialValues={
            {
              email: user?.email,
              name: user?.name,
              mobileNumber: user?.mobileNumber || '',
              role: user?.role,
            } as Omit<UpdateUserDTO, 'id'>
          }
          validationSchema={UserSchema}
          onSubmit={({ image, ...values }) => {
            updateUser({ id: userId, ...values });
          }}
        >
          {({ errors, setFieldValue, setFieldError, isValid }) => (
            <Form className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    label="Email address"
                    disabled={isUpdateLoading}
                    errors={errors}
                  />
                  <Input id="name" name="name" type="text" autoComplete="name" label="Name" errors={errors} />
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    autoComplete="mobileNumber"
                    label="Mobile phone number"
                    disabled={isUpdateLoading}
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
                        disabled={isUpdateLoading}
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

                  <div className="sm:col-span-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      {user?.image ? (
                        <img className="h-12 w-12 rounded-full object-cover" src={user?.image} alt="" />
                      ) : (
                        <AvatarPlaceholder size="l" />
                      )}
                      <Field
                        onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                          const file = event.target.files?.[0];
                          if (!file) {
                            return;
                          }

                          setFieldValue('image', file);
                          if (!isValidAvatarFileType(file)) {
                            return;
                          }

                          if (roundToTwoDecimals(fileSizeInMb(file)) > MAX_AVATAR_FILE_SIZE_IN_MB) {
                            return;
                          }

                          setFieldError('image', undefined);
                          setAvatarFile(file);
                        }}
                        id="image"
                        name="image"
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
                    Edit
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
