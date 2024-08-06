'use client';
import { useNetwork } from '@/hooks/useNetwork';

interface NetworkStatusProps {
  children: React.ReactNode;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ children }) => {
  const isOnline = useNetwork();

  if (!isOnline) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">No internet connection</h1>
          <p className="text-lg mt-4">Please check your connection and try again</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NetworkStatus;
