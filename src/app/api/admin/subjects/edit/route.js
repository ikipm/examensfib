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

    // Find the existing subject using findOne for a single document
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

    // Fetch existing contents from the database
    const existingContents = await Content.find({ subject: subject._id });

    // Create a map of existing contents for easy lookup
    const existingContentsMap = new Map();
    existingContents.forEach(content => {
      existingContentsMap.set(content._id.toString(), content);
    });

    // Array to hold the updated content IDs
    const updatedContentIds = [];

    // Iterate over the incoming contentsData
    for (const contentItem of contentsData) {
      if (contentItem._id && existingContentsMap.has(contentItem._id)) {
        // Update existing content
        const existingContent = existingContentsMap.get(contentItem._id);
        existingContent.title = contentItem.title;
        existingContent.description = contentItem.description;
        await existingContent.save();
        updatedContentIds.push(existingContent._id);
        // Remove from the map to identify contents to delete later
        existingContentsMap.delete(contentItem._id);
      } else {
        // Create new content
        const newContent = new Content({
          title: contentItem.title,
          description: contentItem.description,
          subject: subject._id,
        });
        await newContent.save();
        updatedContentIds.push(newContent._id);
      }
    }

    // Delete contents that were not included in the incoming contentsData
    const contentsToDelete = Array.from(existingContentsMap.values());
    for (const content of contentsToDelete) {
      await Content.deleteOne({ _id: content._id });
    }

    // Update the subject's contents array
    subject.contents = updatedContentIds;

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
