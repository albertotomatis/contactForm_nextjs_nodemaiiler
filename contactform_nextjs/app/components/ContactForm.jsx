'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // validazioni mentre utente digita input
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

    if (name === 'message') {
      if (!value) {
        newErrors.message = 'Message is required';
      } else if (value.length < 4 || value.length > 1000) {
        newErrors.message = 'Message must be between 4 and 1000 characters'; // Updated message length
      } else {
        newErrors.message = '';
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

  // invio del form
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

    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 4 || formData.message.length > 1000) {
      newErrors.message = 'Message must be between 4 and 1000 characters'; // Updated message length
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // invio dati al server
    try {
        const res = await fetch('api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (res.ok) {
          const form = e.target;
          // Resetta il form dopo l'invio riuscito
          form.reset();
        } else {
            console.log('Invio non riuscito.');
          }
      } catch (error) {
        console.log("Errore durante l'invio:", error);
      }
    };
    
  return (
    // contact form
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
              Email
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
                maxLength={1000}
                minLength={4}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 sm:text-sm sm:leading-6"
              />
              {errors.message && (
                <p className="text-red-400 font-bold w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {errors.message}
                </p>
              )}
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
