'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { GoArrowRight } from 'react-icons/go';
import Link from 'next/link';

// Use dynamic import for components that are not immediately necessary
const LandingHeader = dynamic(() => import('@/components/header/Landing'));

export default function LandingPage() {
  return (
    <div className="container relative mx-auto px-4 h-full flex flex-col">
      <LandingHeader />
      <main className="flex flex-col container justify-center md:justify-around flex-grow text-center">
        <section className="flex flex-col justify-center items-center text-[#0D4222] dark:text-[#E6F6F0] py-4 md:py-12 z-50">
          <h2 className="text-3xl leading-[65px] md:text-[80px] py-3 md:py-6 Unigoe-font">
            Unlock Financial Insights
          </h2>
          <p className="md:text-4xl py-2 md:py-5 mb-4">
            Explore Publicly Traded Companies in <br /> Uganda and Kenya
          </p>
          <div>
            <Link
              href="/dashboard"
              className="bg-[#1EF1A5] cursor-pointer text-[#0D4222] p-2 md:px-5 md:py-3 rounded-full text-[16px] md:text-[26px] font-light inline-flex items-center justify-center"
              style={{
                zIndex: 1000,
              }}
            >
              Get Started
              <GoArrowRight
                className="ml-2 text-[#E6F6F0] bg-[#0D4222] p-1 md:p-2 rounded-lg"
                size={32}
              />
            </Link>
          </div>
        </section>

        <section className="flex justify-center items-center py-12 flex-grow">
          <Image
            src="/images/landingIllustration.png"
            alt="Landing Illustration"
            layout="fill"
            objectFit="contain"
            loading="lazy"
          />
          <section className="justify-center items-center py-12 flex-grow  md:flex">
            <Image
              src="/images/landingImage.png"
              alt="Landing Image"
              width={500}
              height={300}
              layout="responsive"
              loading="lazy"
              className="dark:hidden"
            />
            <Image
              src="/images/landingImage2.png"
              alt="Landing Image"
              width={500}
              height={300}
              layout="responsive"
              priority
              className="hidden dark:block"
            />
          </section>
        </section>
      </main>
    </div>
  );
}
