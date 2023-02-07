import { CreateUserDTO } from '@/api/user/user.dto';
import { ErrorMessage, Field, FormikErrors } from 'formik';

type Props = {
  errors: FormikErrors<CreateUserDTO>;
  label: string;
  id: keyof CreateUserDTO;
  name: keyof CreateUserDTO;
  autoComplete: string;
} & Partial<HTMLInputElement>;

export const Input = ({ errors, label, id, name, autoComplete, ...props }: Props) => (
  <div className="sm:col-span-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <Field
        id={id}
        name={name}
        autoComplete={autoComplete}
        className={
          errors[name]
            ? 'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
            : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300 sm:text-sm'
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : ''}
        {...props}
      />
    </div>
    <ErrorMessage name={name}>
      {(message) => (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {message}
        </p>
      )}
    </ErrorMessage>
  </div>
);
