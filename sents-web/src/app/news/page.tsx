'use client';
import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '@/components/layout';
import SubNav from '@/components/navigation/SubNav';
import TopNews from './_sections/TopNews';
import News from './_sections/News';
import Events from './_sections/Events';
import Resources from './_sections/Resources';
import Teams from './_sections/Teams';
import { getAllCompanyNews } from '@/services/apis/companies';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomSession } from '@/utils/types';

const links = ['Top News', 'News', 'Events', 'Resources', 'Teams'];

const NewsPage = () => {
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [newsData, setNewsData] = useState<any[]>([]);
  const [selectedLink, setSelectedLink] = useState<any>(links[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      if (session?.token) {
        const response = await getAllCompanyNews(session.token);
        if (response.status === 200) {
          setNewsData(response.data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch news', response);
        }
      }
    };

    fetchNews();
  }, [session]);

  // Get the news data for the selected link
  const selectedNewsData = useMemo(
    () => newsData[selectedLink],
    [newsData, selectedLink],
  );

  return (
    <MainLayout>
      {isLoading ? (
        <>
          <Skeleton className="w-full p-8 rounded-2xl bg-slate-200" />
          <Skeleton className="w-full h-60 rounded-2xl bg-slate-200" />
        </>
      ) : (
        <>
          <div className="pt-3">
            <SubNav
              links={links}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
          </div>
          <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
            {selectedLink === 'Top News' && <TopNews data={selectedNewsData} />}
            {selectedLink === 'News' && <News data={selectedNewsData} />}
            {selectedLink === 'Events' && <Events data={selectedNewsData} />}
            {selectedLink === 'Resources' && (
              <Resources data={selectedNewsData} />
            )}
            {selectedLink === 'Teams' && <Teams data={selectedNewsData} />}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default NewsPage;
