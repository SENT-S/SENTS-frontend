import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import NotFoundIllustration from '@/public/images/notfound.png';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-black px-4 py-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={NotFoundIllustration}
          alt="Page not found illustration"
          className="object-contain w-1/3 h-auto"
          loading="eager"
        />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">Page Not Found</h1>
      <p className="text-center text-gray-600 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable. Please check the URL or head back to the homepage.
      </p>
      <Link href="/dashboard">
        <span className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-200">
          Go to Homepage
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
