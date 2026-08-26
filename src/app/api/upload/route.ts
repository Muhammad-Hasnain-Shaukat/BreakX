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

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const fileUrls: string[] = [];

    for (const file of files) {
      if (typeof file === 'string') continue;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);

      fileUrls.push(`/uploads/${safeName}`);
    }

    return NextResponse.json({ success: true, urls: fileUrls });
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
