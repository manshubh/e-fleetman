import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export const ApplicationLogin = () => (
  <div>
    <Link to="/home/dashboard">
      <Button>Login</Button>
    </Link>
  </div>
)
