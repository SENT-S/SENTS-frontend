import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi2';
import { MdOutlineDateRange } from 'react-icons/md';
import { MdOutlineWebAsset } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';

const Overview_section = ({ companyData, companyID, isLoading }: any) => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    about_company: '',
    mission_statement: '',
    vision_statement: '',
    ceo: '',
    number_of_employees: 0,
    year_founded: 0,
    website_url: '',
  });

  useEffect(() => {
    setFormState({
      about_company: companyData?.about_company,
      mission_statement: companyData?.mission_statement,
      vision_statement: companyData?.vision_statement,
      ceo: companyData?.ceo,
      number_of_employees: companyData?.number_of_employees,
      year_founded: companyData?.year_founded,
      website_url: companyData?.website_url,
    });
  }, [companyData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">Overview</h1>

      <div className="space-y-3">
        <div className="text-left text-[#0D4222] dark:text-gray-300">
          <Label className="text-2xl font-medium">About</Label>
        </div>
        <Textarea
          value={formState.about_company}
          onChange={handleChange}
          name="about_company"
          placeholder="About"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3">
          <div className="text-left text-[#0D4222] dark:text-gray-300">
            <Label className="text-2xl font-medium">Mission Statement</Label>
          </div>
          <Textarea
            value={formState.mission_statement}
            onChange={handleChange}
            name="mission_statement"
            placeholder="Mission Statement"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
        <div className="space-y-3">
          <div className="text-left text-[#0D4222] dark:text-gray-300">
            <Label className="text-2xl font-medium">Vision Statement</Label>
          </div>
          <Textarea
            value={formState.vision_statement}
            onChange={handleChange}
            name="vision_statement"
            placeholder="Vision Statement"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3">
          <div className="flex items-center text-[#0D4222] dark:text-gray-300">
            <HiOutlineUser size={20} className="mr-2" />
            <Label className="text-2xl font-medium">CEO</Label>
          </div>
          <Input
            value={formState.ceo}
            onChange={handleChange}
            type="text"
            name="ceo"
            placeholder="Enter CEO Name"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-[#0D4222] dark:text-gray-300">
            <HiOutlineUsers size={20} className="mr-2" />
            <Label className="text-2xl font-medium">Employees</Label>
          </div>
          <Input
            value={formState.number_of_employees}
            onChange={handleChange}
            type="number"
            name="number_of_employees"
            placeholder="Enter Number of Employees"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3">
          <div className="flex items-center text-[#0D4222] dark:text-gray-300">
            <MdOutlineDateRange size={20} className="mr-2" />
            <Label className="text-2xl font-medium">Founded</Label>
          </div>
          <Input
            value={formState.year_founded}
            onChange={handleChange}
            type="number"
            name="year_founded"
            placeholder="Enter Founded Year"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-[#0D4222] dark:text-gray-300">
            <MdOutlineWebAsset size={20} className="mr-2" />
            <Label className="text-2xl font-medium">Website</Label>
          </div>
          <Input
            value={formState.website_url}
            onChange={handleChange}
            type="text"
            name="website_url"
            placeholder="Enter Website"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="bg-[#148C59] w-full text-white p-2 md:p-7 rounded-2xl hover:bg-green-600"
        onClick={() => null}
        disabled={loading}
      >
        {loading ? <ScaleLoader height={20} color="#fff" /> : 'Save'}
      </Button>
    </form>
  );
};

export default Overview_section;
