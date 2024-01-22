import { FormEvent } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks';

type TInputFields<T> = {
  type: 'password' | 'text' | 'email';
  name: keyof T;
  placeholder: string;
};

type TAuthFormProps<T> = {
  buttonTitle: string;
  fields: TInputFields<T>[];
  onSubmit: (fields: T) => void;
};

function initialState<T>(fields: TInputFields<T>[]): T {
  return fields.reduce((acc, {name}) => {
      return {...acc, [name]: ''}
    },
  {} as T);
}

function AuthForm<T>({ fields, buttonTitle, onSubmit }: TAuthFormProps<T>) {
  const { values, handleChange } = useForm(initialState<T>(fields));
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };
  
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {fields.map(({ name: key, type, placeholder }) => {
        const field = key as string;
        const InputNode = type === 'password' ? PasswordInput : Input;
        return (
          <InputNode
            key={field}
            type={type}
            required
            placeholder={placeholder}
            name={field}
            value={values[key] as string}
            extraClass="mb-6"
            onChange={handleChange}
          />
        );
      })}
      <Button extraClass="mb-20" htmlType="submit">{buttonTitle}</Button>
    </form>
  );
}

export default AuthForm;
