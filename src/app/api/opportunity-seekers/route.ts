import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Sign in required', seekers: [] }, { status: 401 });
    }

    // 1. Admin returns all candidate applicants
    if (session.role === 'admin') {
      const allSeekers = await prisma.opportunitySeeker.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { fullName: true, profilePicture: true, role: true },
          },
        },
      });
      return NextResponse.json({ seekers: allSeekers });
    }

    // 2. Talent Seekers return ONLY their own submitted applications
    if (session.role === 'seeker') {
      const userApplications = await prisma.opportunitySeeker.findMany({
        where: {
          OR: [
            { email: session.email },
            { userId: session.id },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ seekers: userApplications });
    }

    // 3. Client partners have ZERO access to talent seeker resumes
    return NextResponse.json({ seekers: [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, seekers: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please sign in to submit your candidate application.' }, { status: 401 });
    }

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

    if (!name || !phone || !role || !experience || !introduction || !resumeFile) {
      return NextResponse.json({ error: 'Missing required candidate fields' }, { status: 400 });
    }

    // Enforce verified session email for seekers
    const verifiedEmail = session.email || email;

    const newSeeker = await prisma.opportunitySeeker.create({
      data: {
        userId: session.id,
        name: name || session.fullName,
        email: verifiedEmail,
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
