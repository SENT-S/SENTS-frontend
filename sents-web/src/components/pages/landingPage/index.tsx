'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

import LandingHeader from '../../header/Landing';

import landingIllustration from '@/public/images/landingIllustration.png';
import landingImage from '@/public/images/landingImage.png';
import landingImage2 from '@/public/images/landingImage2.png';
import { CustomSession } from '@/utils/types';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Index = () => {
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };

  return (
    <div className="container relative mx-auto px-4 h-dvh flex flex-col">
      <LandingHeader session={session} status={status} />
      <main className="flex flex-col container justify-center md:justify-around flex-grow text-center">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col justify-center items-center text-[#0D4222] dark:text-[#E6F6F0] py-4 md:py-12 z-50"
        >
          <h2 className="text-3xl leading-[65px] md:text-[80px] py-3 md:py-6 Unigoe-font">
            Unlock Financial Insights
          </h2>
          <p className="md:text-4xl py-2 md:py-5 mb-4">
            Explore Publicly Traded Companies in <br /> Uganda and Kenya
          </p>
          <div>
            <Link
              href={session ? '/dashboard' : '/login_register'}
              className="bg-[#1EF1A5] cursor-pointer text-[#0D4222] p-2 md:px-5 md:py-3 rounded-full text-[16px] md:text-[26px] font-light inline-flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
              style={{
                zIndex: 1000,
              }}
            >
              {session ? 'Go to Dashboard' : 'Get Started'}
              <GoArrowRight
                className="ml-2 text-[#E6F6F0] bg-[#0D4222] p-1 md:p-2 rounded-lg"
                size={32}
              />
            </Link>
          </div>
          <Image
            src={landingIllustration}
            alt="Landing Illustration"
            loading="lazy"
            className="mt-8"
          />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.5 }}
          className="justify-center items-center flex-grow hidden md:flex"
        >
          <Image src={landingImage} alt="Landing Image" priority className="dark:hidden" />
          <Image src={landingImage2} alt="Landing Image" priority className="hidden dark:block" />
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
