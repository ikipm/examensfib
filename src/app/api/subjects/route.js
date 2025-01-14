import connectToDatabase from '@/lib/db';
import Subject from '@/models/Subject';
import { NextResponse } from 'next/server';

// GET request handler
export async function GET(request) {
  await connectToDatabase();

  try {
    const subjects = await Subject.find({});
    return NextResponse.json({ subjects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching subjects' }, { status: 500 });
  }
}

// POST request handler
export async function POST(request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const newSubject = await Subject.create(body);
    return NextResponse.json(newSubject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating subject' }, { status: 400 });
  }
}