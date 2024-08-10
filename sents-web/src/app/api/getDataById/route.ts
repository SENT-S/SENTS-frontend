import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]/options';

import { CustomSession } from '@/utils/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });
  }

  const { token } = session as CustomSession;

  const endpoint = req.nextUrl.searchParams.get('endpoint');
  const id = req.nextUrl.searchParams.get('id');

  if (!endpoint) {
    return NextResponse.json({ data: 'Endpoint not specified' }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ data: 'ID not specified' }, { status: 400 });
  }

  const url = `${BASE_URL}/${endpoint}/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response.data;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { data: 'Error fetching data', error: error.message },
      { status: 500 },
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
