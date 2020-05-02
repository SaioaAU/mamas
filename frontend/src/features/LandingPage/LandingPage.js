import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const LandingPage = () => (
  <>
    <NavBar />
    Landing page
    <Link to="/profile">Profile</Link>
  </>
);

export default LandingPage;
