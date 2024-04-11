import React from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { GoArrowRight } from 'react-icons/go';
import { TfiWorld } from 'react-icons/tfi';

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold">Your Brand</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#features" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="text-center py-12">
          <h2 className="text-5xl font-bold mb-6">Welcome to Our Service</h2>
          <p className="text-xl mb-8">
            A brief description of your product or service offering.
          </p>
          <a
            href="#get-started"
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600"
          >
            Get Started
          </a>
        </section>

        {/* Add more sections as needed */}
      </main>

      <footer className="py-6">
        <p className="text-center text-sm">
          © 2024 Your Brand. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
