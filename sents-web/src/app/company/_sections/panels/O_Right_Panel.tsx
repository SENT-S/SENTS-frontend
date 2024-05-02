import React from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineDateRange } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import Link from 'next/link';

interface AboutProps {
  data: any;
}

const O_Right_Panel = ({ data }: AboutProps) => {
  const url = new URL(data?.website_url);
  const cleanedUrl = url.hostname;

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
      <h1 className="text-2xl font-bold">About</h1>
      <div>
        <p className="text-justify">
          {data?.about_company && data.about_company}
        </p>
      </div>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex">
            <HiOutlineUser className="text-2xl mr-2" color="#148C59" />
            CEO
          </div>
          <span> {data?.ceo && data.ceo}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <HiOutlineUsers className="text-2xl mr-2" color="#148C59" />
            Employees
          </div>
          <span> {data?.number_of_employees && data.number_of_employees}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <MdOutlineDateRange className="text-2xl mr-2" color="#148C59" />
            Founded
          </div>
          <span> {data?.year_founded && data.year_founded}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <CgWebsite className="text-2xl mr-2" color="#148C59" />
            Website
          </div>
          <span>
            <Link
              href={data?.website_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#148C59]"
            >
              {cleanedUrl}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default O_Right_Panel;
