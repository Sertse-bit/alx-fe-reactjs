// src/components/FormikForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

export default function FormikForm() {
  async function handleSubmit(values, { setSubmitting, resetForm, setStatus }) {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setStatus({ success: 'User registered (mock): ' + data.id });
      resetForm();
    } catch (err) {
      setStatus({ error: 'Submission failed.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form style={{ maxWidth: 420 }}>
          {status && status.error && <div style={{ color: 'red' }}>{status.error}</div>}
          {status && status.success && <div style={{ color: 'green' }}>{status.success}</div>}

          <div>
            <label>Username</label><br />
            <Field name="username" />
            <div><ErrorMessage name="username" component="div" style={{ color: 'red' }} /></div>
          </div>

          <div>
            <label>Email</label><br />
            <Field name="email" type="email" />
            <div><ErrorMessage name="email" component="div" style={{ color: 'red' }} /></div>
          </div>

          <div>
            <label>Password</label><br />
            <Field name="password" type="password" />
            <div><ErrorMessage name="password" component="div" style={{ color: 'red' }} /></div>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
