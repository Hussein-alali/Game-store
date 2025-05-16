import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

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
      
      if (!values.fullName) {
        errors.fullName = 'Full name is required';
      }
      
      if (!values.username) {
        errors.username = 'Username is required';
      }
      
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      if (!values.age) {
        errors.age = 'Age is required';
      } else if (parseInt(values.age) < 13) {
        errors.age = 'You must be at least 13 years old';
      }
      
      if (!values.gender) {
        errors.gender = 'Gender is required';
      }
      
      if (!values.country) {
        errors.country = 'Country is required';
      }
      
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: values.fullName,
            username: values.username,
            email: values.email,
            password: values.password,
            age: parseInt(values.age),
            gender: values.gender,
            country: values.country
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.errors) {
            // Handle validation errors
            const errorMessage = data.errors.map(err => err.msg).join(', ');
            setServerError(errorMessage);
          } else {
            setServerError(data.message || 'Registration failed');
          }
          setSubmitting(false);
          return;
        }

        // Registration successful
        alert('Registration successful! Please sign in.');
        setSubmitting(false);
        navigate('/signin');
      } catch (error) {
        console.error('Registration error:', error);
        setServerError('Server error. Please try again later.');
        setSubmitting(false);
      }
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
        {formik.errors.fullName && formik.touched.fullName && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.fullName}</div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.username}</div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
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
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
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
        {formik.errors.age && formik.touched.age && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.age}</div>
        )}

        <select
          name="gender"
          required
          onChange={formik.handleChange}
          value={formik.values.gender}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formik.errors.gender && formik.touched.gender && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.gender}</div>
        )}

        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        {formik.errors.country && formik.touched.country && (
          <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.country}</div>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {serverError && (
          <div style={{ color: 'red', marginTop: '10px' }}>{serverError}</div>
        )}

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
