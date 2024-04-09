'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/layout';
import Image from 'next/image';
import TableComponent from '@/components/table';

interface CountryData {
  country: string;
  total: number;
  flag: string;
}

interface TableData {
  'Company Name': string;
  'Stock Symbol': string;
  'Sector/Industry': string;
}

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState('Uganda');

  const countryData: CountryData[] = [
    {
      country: 'Uganda',
      total: 25,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg',
    },
    {
      country: 'Kenya',
      total: 26,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg',
    },
  ];

  const tableData: TableData[] = [
    {
      'Company Name': 'Stanbic Uganda Holdings Limited',
      'Stock Symbol': 'SBU',
      'Sector/Industry': 'Financial Services',
    },
    {
      'Company Name': 'Jubilee Holdings Limited',
      'Stock Symbol': 'JHL',
      'Sector/Industry': 'Insurance',
    },
    {
      'Company Name': 'Umeme Limited',
      'Stock Symbol': 'UMEME',
      'Sector/Industry': 'Utilities',
    },
    {
      'Company Name': 'Bank of Baroda Uganda Limited',
      'Stock Symbol': 'BOBU',
      'Sector/Industry': 'Financial Services',
    },
    {
      'Company Name': 'DFCU Group',
      'Stock Symbol': 'DFCU',
      'Sector/Industry': 'Financial Services',
    },
    {
      'Company Name': 'Jubilee Holdings Limited',
      'Stock Symbol': 'JHL',
      'Sector/Industry': 'Insurance',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-2xl font-medium text-[#0D4222] text-left">
          Dashboard
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {countryData.map(item => (
            <div
              key={item.country}
              className={`w-full flex justify-around cursor-pointer items-center p-4 rounded-2xl ${item.country === selectedCountry ? 'bg-[#148C59] text-white' : 'bg-white'}`}
              onClick={() => setSelectedCountry(item.country)}
            >
              <div className="flex flex-col text-left">
                <h1 className="font-medium">{item.country}</h1>
                <span className="text-xl font-bold">{item.total}</span>
              </div>
              <div className="relative w-[50px] h-[50px]">
                <Image
                  src={item.flag}
                  alt={`flag of ${item.country}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <TableComponent
            headers={['Company Name', 'Stock Symbol', 'Sector/Industry']}
            onRowClick={row => console.log(row)}
            rows={tableData}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
