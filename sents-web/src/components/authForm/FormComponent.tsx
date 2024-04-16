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

interface FormComponent {
  title: string;
  children: React.ReactNode;
  footerText: string;
  socialButtons: { id: string; icon: StaticImageData; name: string }[];
}

export default function FormComponent({
  title,
  children,
  footerText,
  socialButtons,
}: FormComponent) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = await signIn('credentials', {
      redirect: false,
      ...data,
    });

    setLoading(false);

    if (result?.error) {
      // Handle error here
      console.error(result.error);
    } else {
      // Successful sign in
      router.push('/dashboard');
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
            {loading ? 'Loading...' : footerText}
          </Button>
        </CardFooter>
      </form>
      <div className="flex w-full flex-col items-center relative">
        <Separator className="my-4 bg-[#9C9AA54D]" />
        <span className="text-center text-[12px] bg-white dark:bg-[#39463E] w-[48px] absolute top-[7px]">
          OR
        </span>
      </div>
      <div className="flex space-x-3">
        {socialButtons.map((button: any) => (
          <Button
            key={button.id}
            className={`dark:bg-[#39463E80] hover:bg-[#148C5966] border border-[#148C5966] relative w-full`}
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
}
