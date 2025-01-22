import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessOrder = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-3xl text-secondary font-semibold mb-4">Order Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully.</p>
        <p className="text-xl text-gray-600 font-semibold">
          <strong></strong> {orderId}
        </p>
      </div>
    </div>
  );
};

export default SuccessOrder;
