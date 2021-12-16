import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';

const Contacts = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    subject: '',
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
      url: `${process.env.NEXT_PUBLIC_FORMSPREE_PROJECT}`,
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
    <div className="lg:px-0 flex flex-col dark:bg-gray-800">
      <PageTitle text="Contacts" />
      <div className="flex flex-col">
        <h3 className="text-3xl font-semibold text-gray-900 mb-8 pt-2 self-center dark:text-gray-100">
          Fill the form below
        </h3>
      </div>
      <div className="p-4">
        <div className="mx-auto flex flex-col max-w-3xl">
          <form onSubmit={handleOnSubmit}>
            <input type="hidden" name="_language" value="it" />
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
                className="p-2 border border-gray-300 focus:border-gray-400 focus:shadow-md transition-all duration-500 outline-none"
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
                className="p-2 border border-gray-300 focus:border-gray-400 focus:shadow-md transition-all duration-500 outline-none"
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
                className="p-2 border border-gray-300 focus:border-gray-400 focus:shadow-md transition-all duration-500 outline-none"
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
                className="h-48 p-2 border border-gray-300 focus:border-gray-400 focus:shadow-md transition-all duration-500 outline-none"
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
      </div>
      <div className="flex flex-col ml-8">
        {status.info.error && <div className="error">Error: {status.info.msg}</div>}
        {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
      </div>
    </div>
  );
};

export default Contacts;

// This is a build test
