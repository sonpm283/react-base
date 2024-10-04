import { UseFormRegister, FieldValues, FieldErrors, Path } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
}

function TextField<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder = '',
}: TextFieldProps<T>) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`input input-bordered ${errors[name] ? 'input-error' : ''}`}
      />
      {errors[name] && (
        <label className="label">
          <span className="label-text-alt text-error">{errors[name]?.message as string}</span>
        </label>
      )}
    </div>
  );
}

export default TextField
