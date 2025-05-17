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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('http://localhost:5000/api/signin', {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          
          setErrors({ apiError: data.message || 'Login failed' });
        } else {
          
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
          navigate('/');
        }
      } catch (error) {
        setErrors({ apiError: 'Network error, please try again.' });
      } finally {
        setSubmitting(false);
      }
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

        {formik.errors.apiError && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            {formik.errors.apiError}
          </div>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>

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
