import React, { useState } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  const [inputs, setInputs] = useState({
    email: '',
    message: ''
  });
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      });
      setInputs({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      setStatus({
        info: { error: true, msg: msg }
      });
    }
  };
  const handleOnChange = e => {
    e.persist();
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    });
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/xyyoyenv',
      data: inputs
    })
      .then(response => {
        handleServerResponse(true, 'Thank you, your message has been submitted.');
      })
      .catch(error => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto lg:px-0 flex flex-col">
      <h2 className="text-4xl font-semibold text-gray-900 mb-8 pt-8 self-center">
        <span className="text-blue-900 font-bold">Contacts</span> Page
      </h2>
      <div className="flex flex-col justify-center align-middle p-6">
        <h1 className="text-2xl mb-4 self-center">Fill the form below</h1>
        <div className="flex flex-col p-6">
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-4">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleOnChange}
                required
                value={inputs.name}
                className="p-2 border border-gray-200 focus:border-gray-400 transition-all duration-500 outline-none"
                placeholder="insert your name"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-4">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="_replyto"
                onChange={handleOnChange}
                required
                value={inputs.email}
                className="p-2 border border-gray-200 focus:border-gray-400 transition-all duration-500 outline-none"
                placeholder="insert your email"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-4">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                onChange={handleOnChange}
                required
                value={inputs.subject}
                className="p-2 border border-gray-200 focus:border-gray-400 transition-all duration-500 outline-none"
                placeholder="insert your subject"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="message" className="mb-4">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleOnChange}
                required
                value={inputs.message}
                placeholder="write your message"
                className="h-48 p-2 border border-gray-200 focus:border-gray-400 transition-all duration-500 outline-none"
              />
            </div>
            <div className="flex flex-col mb-4 p-4">
              <button
                type="submit"
                disabled={status.submitting}
                className="self-start bg-blue-900 text-white px-3 py-1 rounded-md"
              >
                {!status.submitting
                  ? !status.submitted
                    ? 'Submit'
                    : 'Submitted'
                  : 'Submitting...'}
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col ml-8">
          {status.info.error && <div className="error">Error: {status.info.msg}</div>}
          {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contacts;

// This is a build test
