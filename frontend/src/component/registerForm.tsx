import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './registerForm.module.css';

interface InputRowProps {
  children: React.ReactNode;
}

const InputRow: FC<InputRowProps> = ({ children }) => (
  <div className={styles.inputRow}>
    {children}
  </div>
);

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
}

interface RegisterFormValues {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  password: string;
  confirm_password: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  // Define Yup validation schema
  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile Number must be 10 digits')
      .required('Mobile Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className={styles.registerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.registerTitle}>
          <h2>Sign Up</h2>
          <p>Please enter the below details to create an account</p>
        </div>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            password: '',
            confirm_password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Call the passed onSubmit function with the form values
            onSubmit(values);
            setSubmitting(false); // Reset the submitting state
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.registerForm}>
              <InputRow>
                <div>
                  <Field type="text" name="first_name" placeholder="First Name*" />
                  <ErrorMessage name="first_name" component="div" className={styles.error} />
                </div>
                <div>
                  <Field type="text" name="last_name" placeholder="Last Name*" />
                  <ErrorMessage name="last_name" component="div" className={styles.error} />
                </div>
              </InputRow>
              <InputRow>
                <div>
                  <Field type="text" name="mobile" placeholder="Mobile Number*" />
                  <ErrorMessage name="mobile" component="div" className={styles.error} />
                </div>
                <div>
                  <Field type="email" name="email" placeholder="Email*" />
                  <ErrorMessage name="email" component="div" className={styles.error} />
                </div>
              </InputRow>
              <InputRow>
                <div>
                  <Field type="password" name="password" placeholder="Password*" />
                  <ErrorMessage name="password" component="div" className={styles.error} />
                </div>
                <div>
                  <Field type="password" name="confirm_password" placeholder="Confirm Password*" />
                  <ErrorMessage name="confirm_password" component="div" className={styles.error} />
                </div>
              </InputRow>
              <button 
                type="submit" 
                className={styles.registerButton} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default RegisterForm;
