'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { registerUser } from '@/services/apis/registerUser';
import { defaultSocialButtons } from '@/utils/Links';

interface AuthTemplateProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  socialButtons?: { id: string; icon: StaticImageData; name: string }[];
  formSchema: z.ZodSchema<any>;
  defaultValues?: any;
}

const AuthTemplate = ({
  title,
  children,
  footerText,
  socialButtons = defaultSocialButtons,
  formSchema,
  defaultValues = {},
}: AuthTemplateProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      if (title === 'Sign In') {
        const res = await signIn('credentials', {
          ...values,
          redirect: false,
        });

        if (res?.ok) {
          toast.success('Sign in successful, redirecting...', {
            style: { background: 'green', color: 'white', border: 'none' },
            duration: 5000,
            position: 'top-center',
          });
          form.reset();
          router.push('/dashboard');
        } else {
          throw new Error(
            `${res?.error}` || 'An error occurred during the process, please try again',
          );
        }
      } else {
        const response = await registerUser(values);

        if (response?.status === 201) {
          toast.success('Registration successful, redirecting...', {
            style: { background: 'green', color: 'white', border: 'none' },
            duration: 5000,
            position: 'top-center',
          });
          form.reset();

          setTimeout(() => {
            router.push('/success-register');
          }, 500);
        } else {
          throw new Error(`${response?.message}` || 'An error occurred during the process');
        }
      }
    } catch (error: any) {
      toast.error(`${error.message}` || 'An error occurred during the process', {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="relative border-none shadow-none space-y-4 text-[#9C9AA5]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      </Form>
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

export default AuthTemplate;
