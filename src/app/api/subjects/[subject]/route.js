import connectToDatabase from '@/lib/db';
import Subject from '@/models/Subject';
import Content from '@/models/Content';
import Exercise from '@/models/Exercise';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  await connectToDatabase();
  const subjectParams = await params;
  try {
    const subject = await Subject.findOne({ url: subjectParams.subject })
      .populate('contents')
      .populate('exercises');

    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    return NextResponse.json({ subject }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching subject' }, { status: 500 });
  }
}