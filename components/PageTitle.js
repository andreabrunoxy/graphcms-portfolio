import React from 'react';

const PageTitle = ({ text }) => {
  return (
    <>
      <h2 className="text-4xl font-semibold text-gray-900 mb-8 pt-8 self-center dark:text-gray-100">
        <span className="text-blue-900 dark:text-blue-500 font-bold">{text}</span> Page
      </h2>
    </>
  );
};

export default PageTitle;
