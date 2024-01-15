import { ChangeEvent, useState } from 'react';

type TUseForm<T> = {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (val: T) => void;
};

export function useForm<T>(inputValues: T): TUseForm<T> {
  const [values, setValues] = useState(inputValues);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
