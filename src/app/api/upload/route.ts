import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const fileUrls: string[] = [];

    // Attempt local storage directory if running in writable environment
    let uploadDir: string | null = null;
    try {
      uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
    } catch {
      uploadDir = null;
    }

    for (const file of files) {
      if (typeof file === 'string') continue;

      // Limit file size to 10MB to maintain optimal database query speeds
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 10MB size limit.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'application/pdf';
      const base64Data = buffer.toString('base64');
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');

      // Create permanent base64 Data URI to store PDF directly in Neon PostgreSQL
      const dataUri = `data:${mimeType};name=${encodeURIComponent(file.name)};base64,${base64Data}`;

      // Optional local mirror write
      if (uploadDir) {
        try {
          const safeName = `${Date.now()}_${safeFileName}`;
          const filePath = path.join(uploadDir, safeName);
          await writeFile(filePath, buffer);
        } catch {
          // Bypassed on serverless environments
        }
      }

      fileUrls.push(dataUri);
    }

    return NextResponse.json({ success: true, urls: fileUrls });
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
