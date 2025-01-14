import connectToDatabase from '@/lib/db';
import Subject from '@/models/Subject';
import Content from '@/models/Content';
import Exercise from '@/models/Exercise';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  await connectToDatabase();
  const {exerciseId} = await params;
  try {
    const exercise = await Exercise.findOne({ _id: exerciseId })
      .populate('subject')
      .populate('content');

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    return NextResponse.json({ exercise }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching exercise' }, { status: 500 });
  }
}