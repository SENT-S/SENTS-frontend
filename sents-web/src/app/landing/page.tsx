'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import LandingIllustration from '@/public/images/landingIllustration.png';
import LandingImage from '@/public/images/landingImage.png';
import LandingImage2 from '@/public/images/landingImage2.png';
import Image from 'next/image';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown, MdOutlineLightMode } from 'react-icons/md';
import { GoArrowRight } from 'react-icons/go';
import { TfiWorld } from 'react-icons/tfi';
import { useTheme } from 'next-themes';

const LandingPage = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="container relative mx-auto px-4 h-full">
      <header className="flex justify-between flex-wrap items-center pt-6">
        <h1 className="text-3xl Unigoe-font tracking-wider text-[#0D4222] dark:text-[#E6F6F0]">
          SENTS.
        </h1>
        <nav>
          <ul className="flex items-center dark:text-white h-auto space-x-6 py-4 px-5 bg-[#E6F6F0] dark:bg-[#39463E80] rounded-full">
            <li>
              <Link
                href="/login_register"
                className="p-3 rounded-xl bg-white dark:bg-[#39463E80]"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href="/login_register"
                className="p-3 rounded-xl bg-[#1EF1A5] dark:text-[#0D4222]"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <button className="mt-1" onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <MdOutlineLightMode size={20} />
                ) : (
                  <BsFillMoonStarsFill size={20} />
                )}
              </button>
            </li>
            <li>
              <button className="flex items-center">
                <TfiWorld className="text-[#0D4222] dark:text-white" />
                <MdOutlineKeyboardArrowDown className="text-[#0D4222] dark:text-white" />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative text-center flex flex-col justify-between  h-full">
        <section className="relative text-[#0D4222] dark:text-[#E6F6F0] py-12 z-50">
          <h2 className="md:text-[80px] mb-6 Unigoe-font">
            Unlock Financial Insights
          </h2>
          <p className="md:text-4xl mb-8">
            Explore Publicly Traded Companies in <br /> Uganda and Kenya
          </p>
          <div>
            <Link
              href="/dashboard"
              className="bg-[#1EF1A5] cursor-pointer text-[#0D4222] px-5 py-3 rounded-full text-[26px] font-light"
              style={{
                zIndex: 1000,
              }}
            >
              Get Started
              <GoArrowRight
                className="inline-block ml-2 text-[#E6F6F0] bg-[#0D4222] p-2 rounded-lg"
                size={32}
              />
            </Link>
          </div>
        </section>

        <section>
          <Image
            src={LandingIllustration}
            alt="Landing Illustration"
            className="object-contain relative bottom-32 lg:bottom-[14rem] xl:bottom-[16rem] z-30"
            loading="eager"
          />
        </section>

        <section>
          <Image
            src={theme === 'dark' ? LandingImage2 : LandingImage}
            alt="Landing Image"
            className="object-contain w-full relative bottom-[125px] lg:bottom-[14rem] 2xl:bottom-[18rem]"
            loading="eager"
          />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
