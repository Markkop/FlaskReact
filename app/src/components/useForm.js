import { useState } from "react";

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
    document.getElementById("cardForm").reset();
    callback();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.id]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues
  };
};

export default useForm;
