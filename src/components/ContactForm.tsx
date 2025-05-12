'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

const initialValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
};

const ContactFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Trop court')
    .max(50, 'Trop long')
    .required('Prénom requis'),
  lastName: Yup.string()
    .min(2, 'Trop court')
    .max(50, 'Trop long')
    .required('Nom requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Numéro de téléphone invalide')
    .min(8, 'Numéro de téléphone trop court')
    .required('Téléphone requis'),
  subject: Yup.string()
    .required('Sujet requis'),
  message: Yup.string()
    .min(10, 'Message trop court')
    .max(1000, 'Message trop long')
    .required('Message requis'),
  consent: Yup.boolean()
    .oneOf([true], 'Vous devez accepter les conditions')
});

const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: ContactFormValues, { resetForm }: { resetForm: () => void }) => {
    try {
      setSubmitStatus('loading');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - in real app, you would send data to your API
      console.log('Form submitted:', values);
      setSubmitStatus('success');
      resetForm();
      
      // Reset success status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="card glass-blue p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={ContactFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            {/* Form status messages */}
            {submitStatus === 'success' && (
              <div className="glass-green p-4 rounded-lg flex items-center text-green-800 dark:text-green-100">
                <FiCheck className="w-5 h-5 mr-2" />
                <span>Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-100 p-4 rounded-lg flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            {/* Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prénom *
                </label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.firstName && touched.firstName 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue'
                  } dark:bg-gray-700 dark:text-white`}
                />
                <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom *
                </label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.lastName && touched.lastName 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue'
                  } dark:bg-gray-700 dark:text-white`}
                />
                <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-600" />
              </div>
            </div>
            
            {/* Contact row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email && touched.email 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue'
                  } dark:bg-gray-700 dark:text-white`}
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Téléphone *
                </label>
                <Field
                  type="tel"
                  name="phone"
                  id="phone"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone && touched.phone 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue'
                  } dark:bg-gray-700 dark:text-white`}
                />
                <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
              </div>
            </div>
            
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sujet *
              </label>
              <Field
                as="select"
                name="subject"
                id="subject"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.subject && touched.subject 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue'
                } dark:bg-gray-700 dark:text-white`}
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="information">Demande d'information</option>
                <option value="inscription">Inscription à une formation</option>
                <option value="partenariat">Proposition de partenariat</option>
                <option value="reclamation">Réclamation</option>
                <option value="autre">Autre</option>
              </Field>
              <ErrorMessage name="subject" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message *
              </label>
              <Field
                as="textarea"
                name="message"
                id="message"
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message && touched.message 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue'
                } dark:bg-gray-700 dark:text-white`}
              />
              <ErrorMessage name="message" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Consent checkbox */}
            <div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Field
                    type="checkbox"
                    name="consent"
                    id="consent"
                    className="w-4 h-4 text-blue bg-gray-100 rounded border-gray-300 focus:ring-blue dark:focus:ring-blue dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="consent" className="text-gray-700 dark:text-gray-300">
                    J'accepte que mes données soient traitées dans le cadre de ma demande de contact *
                  </label>
                </div>
              </div>
              <ErrorMessage name="consent" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'loading'}
                className={`btn btn-primary w-full flex items-center justify-center ${
                  (isSubmitting || submitStatus === 'loading') ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Envoyer le message
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm; 