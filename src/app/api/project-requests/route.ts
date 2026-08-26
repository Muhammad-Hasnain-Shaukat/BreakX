import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    // If client, return only their submitted project requests
    if (session && session.role === 'client') {
      const userRequests = await prisma.projectRequest.findMany({
        where: { email: session.email },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ requests: userRequests });
    }

    // Admin returns all project requests
    const allRequests = await prisma.projectRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { fullName: true, profilePicture: true, role: true },
        },
      },
    });
    return NextResponse.json({ requests: allRequests });
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
      companyName,
      serviceRequired,
      projectBudget,
      projectDeadline,
      projectDescription,
      attachedFiles = [],
    } = body;

    if (!name || !email || !serviceRequired || !projectBudget || !projectDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRequest = await prisma.projectRequest.create({
      data: {
        userId: session?.id || null,
        name,
        email,
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
