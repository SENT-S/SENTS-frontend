'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/layout';
import Image from 'next/image';
import TableComponent from '@/components/table';
import { countryData, tableData } from '@/services/mockData/mock';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('Uganda');

  return (
    <MainLayout>
      <div className="text-2xl font-medium text-[#0D4222] text-left">
        Dashboard
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {countryData.map(item => (
          <div
            key={item.country}
            className={`w-full flex justify-around cursor-pointer items-center p-4 rounded-2xl ${item.country === selectedCountry ? 'bg-[#148C59] text-white' : 'bg-white'} border border-transparent hover:border-[#148C59]`}
            onClick={() => setSelectedCountry(item.country)}
          >
            <div className="flex flex-col text-left">
              <h1 className="font-medium">{item.country}</h1>
              <span className="text-xl font-bold">{item.total}</span>
            </div>
            <div className="relative h-12 w-12">
              <Image
                src={item.flag}
                alt={`flag of ${item.country}`}
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <TableComponent
          headers={['Company Name', 'Stock Symbol', 'Sector/Industry']}
          onRowClick={row => {
            router.push(`/company/${row.id}`);
          }}
          rows={tableData}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
