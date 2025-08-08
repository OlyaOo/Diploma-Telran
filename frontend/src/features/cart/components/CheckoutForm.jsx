import React from 'react';
import { useForm } from 'react-hook-form';

const CheckoutForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
    console.log('Order submitted', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      <input {...register('email', { required: true })} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
