import { useEffect, useMemo, useState, ChangeEvent } from 'react';

type ValidationFn<T> = (value: T) => boolean;
type Validation<T> = [ValidationFn<T>, string];
type Validations<T> = {
  [K in keyof T]?: Validation<T[K]>;
};

export function useForm<T extends Record<string, any>>(
  initialForm: T,
  formValidations: Validations<T> = {}
) {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

  useEffect(() => {
    createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: Record<string, string | null> = {};

    for (const formField of Object.keys(formValidations) as (keyof T)[]) {
      const validation = formValidations[formField];
      if (!validation) continue;
      const [fn, errorMessage] = validation;
      formCheckedValues[`${String(formField)}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
}