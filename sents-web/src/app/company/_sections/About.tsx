import React from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineDateRange } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';

interface AboutProps {
  data: any;
}

const About = ({ data }: AboutProps) => {
  return (
    <div className="space-y-4 rounded-2xl bg-white px-8 py-4">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="text-left">
        Stanbic Uganda Holdings Limited is a leading financial services group
        based in Uganda, serving individuals, businesses, and institutions
        across the country. Established in [year], Stanbic Uganda Holdings has
        grown to become one of the most trusted names in the Ugandan financial
        sector.
        <br />
        Mission Statement: "At Stanbic Uganda Holdings Limited, our mission is
        to empower individuals, businesses, and communities through innovative
        financial solutions that drive sustainable growth and prosperity."
        Vision Statement: "To be the preferred financial services partner,
        recognized for excellence, integrity, and customer-centricity in Uganda
        and beyond."
      </p>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex">
            <HiOutlineUser className="text-2xl mr-2" color="#148C59" />
            CEO
          </div>
          <span> {'Gerald Bucks'}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <HiOutlineUsers className="text-2xl mr-2" color="#148C59" />
            Employees
          </div>
          <span> {105}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <MdOutlineDateRange className="text-2xl mr-2" color="#148C59" />
            Founded
          </div>
          <span> {1987}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <CgWebsite className="text-2xl mr-2" color="#148C59" />
            Website
          </div>
          <span>
            <a href="#" className="text-sm text-[#148C59]">
              website.co.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
