import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      return errors;
    },
    onSubmit: (values) => {
      setIsLoggedIn(true);
      navigate('/');
    },
  });

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={formik.handleSubmit}>
        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.password}</div>
        )}

        <button type="submit">Sign In</button>

        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#007BFF' }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
