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

export async function PUT(request, { params }) {
    const { exerciseId } = params;
    const formData = await request.formData();
  
    try {
      await connectToDatabase();
      const year = Number(formData.get("year"));
      const quarter = Number(formData.get("quarter"));
      const content = formData.get("content");
      const subjectId = formData.get("subject");
      const exerciseImage = formData.get("exerciseImage");
      const solutionImage = formData.get("solutionImage");
  
      // Find existing exercise
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
  
      // Update basic fields
      exercise.year = year;
      exercise.quarter = quarter;
      exercise.content = content;
      exercise.subject = subjectId;
  
      // Handle image updates
      const subject = await Subject.findById(subjectId);
      
      // Process exercise image
      if (exerciseImage && exerciseImage.name) {
        const uploadDir = path.join(process.cwd(), `public/img/${subject.url}/exercise/`);
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  
        const ext = path.extname(exerciseImage.name);
        const filename = `${exerciseId}${ext}`;
        const buffer = await exerciseImage.arrayBuffer();
        
        fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(buffer));
        exercise.statement = `/img/${subject.url}/exercise/${filename}`;
      }
  
      // Process solution image
      if (solutionImage && solutionImage.name) {
        const uploadDir = path.join(process.cwd(), `public/img/${subject.url}/answer/`);
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  
        const ext = path.extname(solutionImage.name);
        const filename = `${exerciseId}${ext}`;
        const buffer = await solutionImage.arrayBuffer();
        
        fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(buffer));
        exercise.answer = `/img/${subject.url}/answer/${filename}`;
      }
  
      await exercise.save();
      return NextResponse.json({ 
        message: "Exercise updated",
        exerciseId: exercise._id,
        contentId: exercise.content 
      });
  
    } catch (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }