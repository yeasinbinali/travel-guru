import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState('');
  const { setLoading, signIn} = useContext(AuthContext);
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setError('');
          if(user?.emailVerified){
            navigate(from, {replace: true});
          }else{
            toast.error('Your email is not verified');
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  return (
    <Form onSubmit={handleLogin} className="w-50 mx-auto mt-5">
      <h3 className="text-center my-3">
        <b>Please, Login</b>
      </h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="email" type="email" placeholder="Enter Email" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control name="password" type="password" placeholder="Password" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <p className='text-danger'>{error}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p className='text-center'>New User? <Link to='/register'>Register</Link></p>
    </Form>
  );
};

export default Login;
