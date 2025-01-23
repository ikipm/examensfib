import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/db";
import Exercise from "@/models/Exercise";
import Subject from "@/models/Subject";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const formData = await request.formData();

  try {
    await connectToDatabase();

    const year = Number(formData.get("year"));
    const quarter = Number(formData.get("quarter"));
    const content = formData.get("content");
    const subjectId = formData.get("subject");

    const exerciseImage = formData.get("exerciseImage");
    const solutionImage = formData.get("solutionImage");

    const newExercise = new Exercise({
      year,
      quarter,
      content,
      subject: subjectId,
      statement: "none",
      answer: "none",
    });
    let savedExercise = await newExercise.save();
    const exerciseId = savedExercise._id;

    const subject = await Subject.findById(subjectId);

    const uploadExerciseDir = `/public/img/${subject.url}/exercise/`;
    const uploadExerciseFullDir = path.join(process.cwd(), uploadExerciseDir);
    if (!fs.existsSync(uploadExerciseFullDir)) {
      fs.mkdirSync(uploadExerciseFullDir, { recursive: true });
    }

    const uploadAnswerDir = `/public/img/${subject.url}/answer/`;
    const uploadAnswerFullDir = path.join(process.cwd(), uploadAnswerDir);
    if (!fs.existsSync(uploadAnswerFullDir)) {
      fs.mkdirSync(uploadAnswerFullDir, { recursive: true });
    }

    let statementPath = "";
    if (exerciseImage) {
      const fileExt = path.extname(exerciseImage.name);
      const statementFileName = `${exerciseId}${fileExt}`;
      const statementFullPath = path.join(uploadExerciseFullDir, statementFileName);
      const exerciseBuffer = await exerciseImage.arrayBuffer();
      fs.writeFileSync(statementFullPath, Buffer.from(exerciseBuffer));
      statementPath = `/img/${subject.url}/exercise/${statementFileName}`;
    }

    let answerPath = "";
    if (solutionImage) {
      const fileExt = path.extname(solutionImage.name);
      const answerFileName = `${exerciseId}${fileExt}`;
      const answerFullPath = path.join(uploadAnswerFullDir, answerFileName);
      const answerBuffer = await solutionImage.arrayBuffer();
      fs.writeFileSync(answerFullPath, Buffer.from(answerBuffer));
      answerPath = `/img/${subject.url}/answer/${answerFileName}`;
    }

    savedExercise.statement = statementPath;
    savedExercise.answer = answerPath;
    await savedExercise.save();

    subject.exercises.push(exerciseId);
    await subject.save();
    
    return NextResponse.json({
      message: "Exercise created successfully",
      exerciseId: newExercise._id,
      contentId: newExercise.content,
    });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
