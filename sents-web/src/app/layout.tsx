import '@/styles/styles.scss';
import NextTopLoader from 'nextjs-toploader';

import AppProvider from './AppProvider';
import NetworkStatus from './NetworkStatus';

import AuthProvider from '@/app/AuthProvider';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: "Sent's",
  description: "Sent's is a platform that helps unlock Financial insights",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeProps = {
    attribute: 'class',
    defaultTheme: 'light',
    enableSystem: true,
    disableTransitionOnChange: true,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-y-auto dark:bg-[#0e120f]">
        <NextTopLoader
          color="#148c59"
          height={4}
          showAtBottom={false}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={false}
          zIndex={999999}
        />
        <Toaster />
        <AuthProvider>
          <AppProvider themeProps={themeProps}>
            <NetworkStatus>{children}</NetworkStatus>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
