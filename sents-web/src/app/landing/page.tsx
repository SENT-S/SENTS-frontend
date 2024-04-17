import Link from 'next/link';
import LandingIllustration from '@/public/images/landingIllustration.png';
import LandingImage from '@/public/images/landingImage.png';
import LandingImage2 from '@/public/images/landingImage2.png';
import Image from 'next/image';
import { GoArrowRight } from 'react-icons/go';
import LandingHeader from '@/components/header/Landing';

const LandingPage = () => {
  return (
    <div className="container relative mx-auto px-4 h-full">
      <LandingHeader />
      <main className="relative text-center flex flex-col justify-between  h-full">
        <section className="relative text-[#0D4222] dark:text-[#E6F6F0] py-12 z-50">
          <h2 className="text-3xl leading-[65px] md:text-[80px] py-6 Unigoe-font">
            Unlock Financial Insights
          </h2>
          <p className="md:text-4xl py-5 mb-4">
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
            src={LandingImage}
            alt="Landing Image"
            className="object-contain w-full relative bottom-[125px] lg:bottom-[14rem] 2xl:bottom-[18rem] dark:hidden"
            loading="eager"
          />
          <Image
            src={LandingImage2}
            alt="Landing Image"
            className="object-contain w-full relative bottom-[125px] lg:bottom-[14rem] 2xl:bottom-[18rem] hidden dark:block"
            loading="eager"
          />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
