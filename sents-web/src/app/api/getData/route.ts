import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]/options';

import { CustomSession } from '@/utils/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXTAUTH_URL;

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const endpoint = req.nextUrl.searchParams.get('endpoint');

    if (!session) {
      return new NextResponse(JSON.stringify({ data: 'Unauthorized user connection' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!endpoint) {
      return new NextResponse(JSON.stringify({ data: 'Endpoint not specified' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = session ? (session as CustomSession).token : null;
    const url = `${BASE_URL}/${endpoint}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });
    const { data } = response.data;

    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return new NextResponse(JSON.stringify({ data: 'Error fetching data', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
