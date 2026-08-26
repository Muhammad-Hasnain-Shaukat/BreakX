import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Sign in required', requests: [] }, { status: 401 });
    }

    // 1. Admin returns all project requests
    if (session.role === 'admin') {
      const allRequests = await prisma.projectRequest.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { fullName: true, profilePicture: true, role: true },
          },
        },
      });
      return NextResponse.json({ requests: allRequests });
    }

    // 2. Client returns ONLY their own submitted project requests
    if (session.role === 'client') {
      const userRequests = await prisma.projectRequest.findMany({
        where: {
          OR: [
            { email: session.email },
            { userId: session.id },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ requests: userRequests });
    }

    // 3. Talent Seekers have ZERO access to client project requests
    return NextResponse.json({ requests: [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, requests: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please sign in to submit a project request.' }, { status: 401 });
    }

    const body = await req.json();

    const {
      name,
      email,
      companyName,
      serviceRequired,
      projectBudget,
      projectDeadline,
      projectDescription,
      attachedFiles = [],
    } = body;

    if (!name || !serviceRequired || !projectBudget || !projectDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Enforce verified session email for clients
    const verifiedEmail = session.email || email;

    const newRequest = await prisma.projectRequest.create({
      data: {
        userId: session.id,
        name: name || session.fullName,
        email: verifiedEmail,
        companyName: companyName || null,
        serviceRequired,
        projectBudget,
        projectDeadline: projectDeadline || 'Flexible',
        projectDescription,
        attachedFiles: JSON.stringify(attachedFiles),
        status: 'Pending',
      },
    });

    return NextResponse.json({ success: true, request: newRequest });
  } catch (error: any) {
    console.error('Create Project Request Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
