import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      country: '',
    },
    validate: (values) => {
      const errors = {};
      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
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
        <h2>Create Account</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={formik.handleChange}
          value={formik.values.fullName}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.confirmPassword}</div>
        )}
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          onChange={formik.handleChange}
          value={formik.values.age}
        />
        <select
          name="gender"
          required
          onChange={formik.handleChange}
          value={formik.values.gender}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          onChange={formik.handleChange}
          value={formik.values.country}
        />

        <button type="submit">Register</button>

        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          Already have an account?{' '}
          <a href="/signin" style={{ color: '#007BFF' }}>
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
