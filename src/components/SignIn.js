import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {useAuth} from '../hooks/useAuth';

const SignIn = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useAuth();


  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('/api/User/login', data);
      if (response.status === 200) {
        login(response.data);

        navigate('/users');
      }
    } catch (error) {
  
      if(error.response){
        const emailTakenError = error.response.data;
        console.log(emailTakenError);
        setError(emailTakenError);
      } 
    }
  };
  return (
    <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-danger">{error}</p>}
      <Form.Group className="mb-3">
        <Form.Control type="email" placeholder="Enter email" {...register('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })}/>
            {errors.email && errors.email.type === "required" && (
            <p className="text-danger">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-danger">Email is not valid.</p>
          )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="password" placeholder="Password" {...register('password', {
              required: true,
              minLength: 1
            })} />
            {errors.password && errors.password.type === "required" && (
            <p className="text-danger">Password is required.</p>
          )}
      </Form.Group>
      <Button variant="success" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default SignIn
