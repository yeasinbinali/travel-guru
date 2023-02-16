import React, { useContext } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.png";
import { AuthContext } from "../../contexts/UserContext";
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/login');
        window.location.reload(false)
      })
      .catch((error) => {
        console.log(error);
      })
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Image className="logo" src={logoImg} alt="logo"></Image>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            {user?.uid ? (
              <button onClick={handleLogout} className="logout-Btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </Nav>
          <div className='d-flex justify-content-between' style={{margin: '0px 20px'}}>
            {user?.email ? (
              <p className="text-danger text-center">{user?.email}</p>
            ) : (
              ""
            )}
            {user?.photoURL ? (
              <Image
                style={{ marginLeft: '10px', width: "40px", borderRadius: "50%" }}
                src={user?.photoURL}
                alt=""
              ></Image>
            ) : (
              <FaUser style={{marginLeft: '10px'}}></FaUser>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
