import { useState } from "react";

const useFormValid = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const name = e.target.name;
    const val = e.target.value;

    setValues({
      ...values,
      [name]: val,
    });

    setErrors({
      ...errors,
      [name]: input.validationMessage,
    });

    setFormValid(input.form.checkValidity());
  };

  return { values, errors, formValid, handleChange };
};

export default useFormValid;
