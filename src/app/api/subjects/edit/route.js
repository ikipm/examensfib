import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from '@/lib/db';
import Subject from "@/models/Subject";
import Content from "@/models/Content";

// Disable Next.js default body parsing to handle multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(request) {
  const formData = await request.formData();

  try {
    await connectToDatabase();
    // Find the existing subject
    const subject = await Subject.findOne({ url: formData.get("url") });
    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    // Extract fields from form data
    const name = formData.get("name");
    const description = formData.get("description");
    const url = formData.get("url");
    const color = formData.get("color");
    const course = formData.get("course");
    const contentsData = formData.get("contents")
      ? JSON.parse(formData.get("contents"))
      : [];

    // Update subject fields
    subject.name = name;
    subject.description = description;
    subject.url = url;
    subject.color = color;
    subject.course = Number(course);

    // Handle icon upload if a new icon is provided
    const iconFile = formData.get("icon");
    if (iconFile) {
      const uploadDir = path.join(process.cwd(), `/public/img/${url}/`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileExt = path.extname(iconFile.name);
      const newPath = path.join(uploadDir, `${url}${fileExt}`);
      const arrayBuffer = await iconFile.arrayBuffer();
      fs.writeFileSync(newPath, Buffer.from(arrayBuffer));
      subject.icon = `/img/${url}/${url}${fileExt}`;
    }

    // Remove existing contents associated with the subject
    await Content.deleteMany({ subject: subject._id });
    subject.contents = [];

    // Create and associate new content documents
    for (const contentItem of contentsData) {
      const contentDoc = new Content({
        title: contentItem.title,
        description: contentItem.description,
        subject: subject._id,
      });
      await contentDoc.save();
      subject.contents.push(contentDoc._id);
    }

    // Save updates to the subject
    await subject.save();

    return NextResponse.json({ 
      message: "Subject updated successfully", 
      subjectId: subject._id, 
      url: subject.url 
    });
  } catch (error) {
    console.error("Error updating subject:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
