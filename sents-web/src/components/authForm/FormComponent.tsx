'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/apis/registerUser';
import { toast } from 'sonner';
import { ScaleLoader } from 'react-spinners';
import Apple from '@/public/icons/apple.png';
import Google from '@/public/icons/google.png';
import Microsoft from '@/public/icons/micro.png';

interface FormComponent {
  title: string;
  children: React.ReactNode;
  footerText: string;
  socialButtons?: { id: string; icon: StaticImageData; name: string }[];
}

const defaultSocialButtons = [
  { id: 'apple', icon: Apple, name: 'Apple' },
  { id: 'google', icon: Google, name: 'Google' },
  { id: 'microsoft', icon: Microsoft, name: 'Microsoft' },
];

const FormComponent = ({
  title,
  children,
  footerText,
  socialButtons = defaultSocialButtons,
}: FormComponent) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (title === 'Sign In') {
        setLoading(true);
        const result = await signIn('credentials', {
          redirect: false,
          ...data,
        });

        setLoading(false);

        if (result?.error) {
          toast.error(result.error, {
            style: { background: 'red', color: 'white', border: 'none' },
            position: 'top-center',
          });
        } else {
          // Redirect to dashboard
          router.push('/dashboard');

          toast.success('Logged in successfully', {
            style: {
              background: 'green',
              color: 'white',
              border: 'none',
            },
            position: 'top-center',
            duration: 5000,
          });
        }
      } else {
        // Register user
        setLoading(true);
        const response = await registerUser(data);
        setLoading(false);

        // Check if registration was successful
        if (response?.status === 201) {
          toast.success('Registration successful, redirecting...', {
            style: { background: 'green', color: 'white', border: 'none' },
            duration: 5000,
            position: 'top-center',
          });

          // Redirect to success page after 2 seconds
          setTimeout(() => {
            router.push('/success-register');
          }, 500);
        } else {
          toast.error('Registration failed, please try again', {
            style: { background: 'red', color: 'white', border: 'none' },
            duration: 5000,
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred during the process', {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    }
  };

  return (
    <Card className="relative border-none shadow-none space-y-4 text-[#9C9AA5]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-2 p-0">{children}</CardContent>
        <CardFooter className="p-0">
          <Button
            className="bg-[#148C59] hover:bg-green-600 text-white w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? <ScaleLoader height={20} color="#fff" /> : footerText}
          </Button>
        </CardFooter>
      </form>
      <div className="flex w-full flex-col items-center relative">
        <Separator className="my-4 bg-[#9C9AA54D]" />
        <span className="text-center text-[12px] bg-white dark:bg-[#39463E] w-[48px] absolute top-[7px]">
          OR
        </span>
      </div>
      <div className="flex space-x-3 cursor-not-allowed">
        {socialButtons.map((button: any) => (
          <Button
            key={button.id}
            className={`dark:bg-[#39463E80] hover:bg-[#148C5966] border border-[#148C5966] relative w-full`}
            disabled={true}
          >
            <Image src={button.icon} alt={button.name} width={25} height={25} />
          </Button>
        ))}
      </div>
      <CardDescription className="text-center text-[10px]">
        By signing up to create an account I accept Company’s
        <Link href="/terms" className="text-black dark:text-[#1EF1A5] pl-2">
          Terms of use & Privacy Policy.
        </Link>
      </CardDescription>
    </Card>
  );
};

export default FormComponent;
