'use client';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'; // Assicurati di importare Link da Next.js

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '', // Aggiunto il campo del messaggio
  });

  const [errors, setErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (name === 'name') {
      if (!value) {
        newErrors.name = 'Name is required';
      } else if (value.length < 4 || value.length > 19) {
        newErrors.name = 'Name must be between 4 and 19 characters';
      } else {
        newErrors.name = '';
      }
    }

    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors.email = 'Invalid email format';
      } else {
        newErrors.email = '';
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 4 || formData.name.length > 19) {
      newErrors.name = 'Name must be between 4 and 19 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Qui puoi inserire la logica per inviare il modulo, ad esempio tramite una richiesta API.
    // Aggiungi la logica per inviare il messaggio.

    setShowSuccessToast(true); // Mostra la notifica di successo
  };

  useEffect(() => {
    if (showSuccessToast) {
      toast.success('Inviato!');
    }
  }, [showSuccessToast]);

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Contattaci
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                name="name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 sm:text-sm sm:leading-6"
              />
              {errors.name && (
                <p className="text-red-400 font-bold w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {errors.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                name="email"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="text-red-400 font-bold w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-bold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2">
              <textarea
                onChange={handleChange}
                name="message"
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900">
            Invia
          </button>
        </form>
        
      </div>
    </div>
  );
}
