'use client';
import Link from 'next/link';
import React, { useEffect, useCallback } from 'react';

import NetworkErrorIllustration from '@/public/icons/NetworkErrorIllustration';

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

const Error: React.FC<ErrorProps> = React.memo(({ error, reset }) => {
  const logError = useCallback((error: Error) => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, []);

  useEffect(() => {
    logError(error);
  }, [error, logError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="p-6 bg-blue-100 rounded-full">
          <NetworkErrorIllustration className="w-32 h-32 mix-blend-multiply" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Oops! Something went wrong</h2>
        <p className="text-lg text-gray-500 max-w-lg">
          We're sorry for the inconvenience. Our team has been notified and we're working on a fix.
          Please try again later or go back to the homepage.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded hover:bg-green-500 transition"
          >
            Go Home
          </Link>
          {reset && (
            <button
              onClick={reset}
              className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

Error.displayName = 'Error';

export default Error;
