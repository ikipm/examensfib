import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/db";
import Exercise from "@/models/Exercise";
import Subject from "@/models/Subject";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const { exerciseId } = params;

  try {
    await connectToDatabase();

    // Validate exercise ID format
    if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
      return NextResponse.json(
        { error: "Invalid exercise ID format" },
        { status: 400 }
      );
    }

    // Find exercise and populate subject data
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    // Get associated subject
    const subject = await Subject.findById(exercise.subject);
    if (!subject) {
      return NextResponse.json(
        { error: "Parent subject not found" },
        { status: 404 }
      );
    }

    // Delete files if they exist
    const deleteImageFile = (imagePath) => {
      if (imagePath && imagePath.startsWith("/img/")) {
        const fullPath = path.join(process.cwd(), "public", imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    };

    // Delete both statement and answer images
    deleteImageFile(exercise.statement);
    deleteImageFile(exercise.answer);

    // Remove exercise from database
    const deleteResult = await Exercise.deleteOne({ _id: exerciseId });
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: "Exercise deletion failed" },
        { status: 500 }
      );
    }

    // Update subject's exercises array
    await Subject.findByIdAndUpdate(
      subject._id,
      { $pull: { exercises: exerciseId } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Exercise deleted successfully",
      deletedId: exerciseId,
      subjectId: subject._id,
    });

  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}