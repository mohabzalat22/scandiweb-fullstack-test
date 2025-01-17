import React from "react";

const Error = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mt-2">
          It might have been moved or deleted.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-secondary text-white px-6 py-2 rounded"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Error;
