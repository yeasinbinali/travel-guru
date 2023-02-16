import React, { useContext, useState } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import { GoogleAuthProvider } from "@firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const { createUser, googleProvider, updateUserProfile, verifyEmail } =
    useContext(AuthContext);
  const providerWithGoogle = new GoogleAuthProvider();
  const handleRegisterForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate("/");
        handleUpdateUser(name, photo);
        handleEmailVerified();
        toast.success("Check your mail and verify");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleUpdateUser = (name, photo) => {
    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleGoogle = () => {
    googleProvider(providerWithGoogle)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleEmailVerified = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <Form onSubmit={handleRegisterForm} className="w-50 mx-auto mt-5">
      <h3 className="text-center my-3">
        <b>Register</b>
      </h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="name" type="text" placeholder="Your Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="photoURL" type="text" placeholder="Your Photo" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter Email"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          onClick={handleChecked}
          type="checkbox"
          label={
            <>
              Accept <Link to="/terms">Terms and Conditions</Link>
            </>
          }
        />
      </Form.Group>
      <p className="text-danger">{error}</p>
      <Button disabled={!checked} variant="primary" type="submit">
        Submit
      </Button>
      <p className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <button onClick={handleGoogle} className="googleBtn">
        Google
      </button>
    </Form>
  );
};

export default Register;
