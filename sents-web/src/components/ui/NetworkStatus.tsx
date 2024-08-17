'use client';
import Image from 'next/image';

import { useNetwork } from '@/hooks/useNetwork';
import ErrorBoundaryImage from '@/public/images/ErrorBoundary.png';

interface NetworkStatusProps {
  children: React.ReactNode;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ children }) => {
  const isOnline = useNetwork();

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-4 space-y-8 text-center">
          <div className="flex items-center justify-center w-auto h-auto p-3 mx-auto bg-blue-100 rounded-full">
            <Image
              src={ErrorBoundaryImage}
              alt="icon"
              width={200}
              height={200}
              className="mix-blend-multiply"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl text-green-700 font-bold">No internet connection</h1>
            <p className="text-lg mt-4">Please check your connection and try again</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NetworkStatus;
