import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../api/axios';

const schema = yup.object().shape({
    fullName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

const SignUp = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
    
      const onSubmit = async (data) => {
        try {
          // Make the API register call
          const response = await axios.post('/api/User/register', data);
          console.log(response);
        } catch (error) {
          console.log(error); // Handle the error
        }
      };
  return (
    <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
    <Form.Group className="mb-3">
      <Form.Control type="name" placeholder="First & Last name " {...register('fullName')} />
        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Control type="email" placeholder="Enter email"{...register('email')} />
        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Control type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Control type="password" placeholder="Confirm Password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p> className='text-danger'{errors.confirmPassword.message}</p>}
    </Form.Group>
    <Button variant="info" type="submit">
      Register
    </Button>
  </Form>
  )
}

export default SignUp;
