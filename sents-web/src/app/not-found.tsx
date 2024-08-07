import Image from 'next/image';
import React from 'react';

import NotFoundIllustration from '@/public/images/notfound.png';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black p-4">
      <div className="bg-white flex justify-center items-center">
        <Image
          src={NotFoundIllustration}
          alt="Not found"
          className="object-contain md:w-1/2 md:h-1/2"
          loading="eager"
        />
      </div>
      <p className="text-2xl mb-4">Page Not Found</p>
      <p className="mt-4 text-center text-gray-700 mb-8">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <a href="/dashboard" className="mt-8 text-blue-500 hover:underline">
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
