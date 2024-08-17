import path from 'path';

import axios from 'axios';
import { config } from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]/options';

import { CustomSession } from '@/utils/types';

// Load environment variables from .env.local file
config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const endpoint = req.nextUrl.searchParams.get('endpoint');
  const authorization = req.headers.get('Authorization');

  if (!session && !authorization) {
    return NextResponse.json({ data: 'Unauthorized user connection' }, { status: 401 });
  }

  if (!endpoint) {
    return NextResponse.json({ data: 'Endpoint not specified' }, { status: 400 });
  }

  const token = session ? (session as CustomSession).token : null;
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const headers = {
      Authorization: authorization || `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });

    const { data } = response.data;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { data: 'Error fetching data', error: error.message },
      { status: 500 },
    );
  }
}
