import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (session && session.role === 'seeker') {
      const userApplications = await prisma.opportunitySeeker.findMany({
        where: { email: session.email },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ seekers: userApplications });
    }

    const allSeekers = await prisma.opportunitySeeker.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { fullName: true, profilePicture: true, role: true },
        },
      },
    });
    return NextResponse.json({ seekers: allSeekers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();

    const {
      name,
      email,
      phone,
      role,
      experience,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      introduction,
      resumeFile,
    } = body;

    if (!name || !email || !phone || !role || !experience || !introduction || !resumeFile) {
      return NextResponse.json({ error: 'Missing required candidate fields' }, { status: 400 });
    }

    const newSeeker = await prisma.opportunitySeeker.create({
      data: {
        userId: session?.id || null,
        name,
        email,
        phone,
        role,
        experience,
        portfolioUrl: portfolioUrl || null,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        introduction,
        resumeFile,
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, seeker: newSeeker });
  } catch (error: any) {
    console.error('Create Opportunity Seeker Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
