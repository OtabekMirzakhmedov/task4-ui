import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

const SignIn = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Do something with the form data
  };
  return (
    <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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
      <Form.Group className="mb-3" controlId="formBasicPassword">
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
