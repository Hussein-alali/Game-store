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
      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
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
            username: values.username,
            email: values.email,
            password: values.password,
            // يمكن ترسل بقية البيانات إذا أردت تخزينها في السيرفر
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setServerError(data.message || 'Registration failed');
          setSubmitting(false);
          return;
        }

        // التسجيل ناجح
        alert('Registration successful! Please sign in.');
        setSubmitting(false);
        navigate('/signin'); // توجه لصفحة تسجيل الدخول
      } catch (error) {
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
