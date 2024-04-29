'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/layout';
import SubNav from '@/components/navigation/SubNav';
import TopNews from './_sections/TopNews';
import News from './_sections/News';
import Events from './_sections/Events';
import Resources from './_sections/Resources';
import Teams from './_sections/Teams';

const links = ['Top News', 'News', 'Events', 'Resources', 'Teams'];

export default function NewsPage() {
  const [selectedLink, setSelectedLink] = useState(links[0]);

  return (
    <MainLayout>
      <SubNav
        links={links}
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
      />
      <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
        {selectedLink === 'Top News' && <TopNews />}
        {selectedLink === 'News' && <News />}
        {selectedLink === 'Events' && <Events />}
        {selectedLink === 'Resources' && <Resources />}
        {selectedLink === 'Teams' && <Teams />}
      </div>
    </MainLayout>
  );
}
