import connectToDatabase from '@/lib/db';
import Content from '@/models/Content';
import { NextResponse } from 'next/server';

// GET request handler
export async function GET(request, { params }) {
  await connectToDatabase();
  const { contentId } = await params;
  try {
    const contents = await Content.find({ _id: contentId });
    return NextResponse.json({ contents }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching subjects' }, { status: 500 });
  }
}
