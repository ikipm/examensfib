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

export async function POST(request) {
    const formData = await request.formData();

    try {
        await connectToDatabase();

        const name = formData.get("name");
        const description = formData.get("description");
        const url = formData.get("url");
        const color = formData.get("color");
        const course = formData.get("course");
        const contentsData = formData.get("contents") ? JSON.parse(formData.get("contents")) : [];

        const uploadDir = path.join(process.cwd(), `/public/img/${url}/`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        let iconPath = "";
        const iconFile = formData.get("icon");
        if (iconFile) {
            const fileExt = path.extname(iconFile.name);
            const newPath = path.join(uploadDir, `${url}${fileExt}`);
            const arrayBuffer = await iconFile.arrayBuffer();
            fs.writeFileSync(newPath, Buffer.from(arrayBuffer));
            iconPath = `/img/${url}/${url}${fileExt}`;
        }

        const subject = new Subject({
            name,
            description,
            url,
            course: Number(course),
            color,
            icon: iconPath,
            contents: [],
            exercises: [],
        });

        await subject.save();

        for (const contentItem of contentsData) {
            const contentDoc = new Content({
                title: contentItem.title,
                description: contentItem.description,
                subject: subject._id,
            });
            await contentDoc.save();
            subject.contents.push(contentDoc._id);
        }

        await subject.save();

        return NextResponse.json({ message: "Subject created successfully", subjectId: subject._id, url: subject.url });
    } catch (error) {
        console.error("Error creating subject:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
