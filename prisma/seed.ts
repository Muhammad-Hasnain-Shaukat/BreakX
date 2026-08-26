import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BreakX Database...');

  // Clean existing tables
  await prisma.opportunitySeeker.deleteMany();
  await prisma.projectRequest.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@breakx.agency',
      fullName: 'BreakX Administrator',
      role: 'admin',
      profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      email: 'client@acme.com',
      fullName: 'Sarah Jenkins',
      role: 'client',
      profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  });

  const seekerUser = await prisma.user.create({
    data: {
      email: 'seeker@dev.io',
      fullName: 'Alex Rivera',
      role: 'seeker',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  });

  // Seed Project Requests
  await prisma.projectRequest.createMany({
    data: [
      {
        userId: clientUser.id,
        name: 'Sarah Jenkins',
        email: 'client@acme.com',
        companyName: 'Acme Global Technologies',
        serviceRequired: 'AI Solution',
        projectBudget: '$50,000 - $100,000',
        projectDeadline: '8 Weeks',
        projectDescription: 'We require an end-to-end AI document intelligence platform capable of indexing enterprise PDFs, generating summary insights, and executing real-time semantic query processing for 5,000+ internal staff.',
        attachedFiles: JSON.stringify(['/uploads/acme_ai_architecture_spec.pdf', '/uploads/acme_ui_wireframes.png']),
        status: 'Approved',
        internalNotes: 'Client signed SLA agreement on Aug 15. Assigned to AI Engineering Lead.',
      },
      {
        userId: clientUser.id,
        name: 'David Vance',
        email: 'd.vance@pulsehealth.co',
        companyName: 'Pulse Health Systems',
        serviceRequired: 'Website Development',
        projectBudget: '$25,000 - $50,000',
        projectDeadline: '6 Weeks',
        projectDescription: 'Redesigning our core patient-facing telemedicine portal with Next.js 14, WebGL dynamic light shader visualizers, real-time doctor appointment scheduler, and HIPAA-compliant data integration.',
        attachedFiles: JSON.stringify(['/uploads/pulse_health_brand_guidelines.pdf']),
        status: 'Reviewing',
        internalNotes: 'Initial discovery call held. Proposal sent for approval.',
      },
      {
        name: 'Elena Rostova',
        email: 'elena@vertexlogistics.io',
        companyName: 'Vertex Autonomous Logistics',
        serviceRequired: 'Automation',
        projectBudget: '$100,000+',
        projectDeadline: '12 Weeks',
        projectDescription: 'Building a real-time IoT fleet telemetry engine with automated route optimization algorithms, predictive maintenance alerts, and custom executive analytics dashboard.',
        attachedFiles: JSON.stringify(['/uploads/vertex_iot_schema.json']),
        status: 'Pending',
        internalNotes: 'High-value enterprise lead. Scheduling technical architecture deep dive.',
      },
      {
        name: 'Marcus Sterling',
        email: 'm.sterling@spherule.finance',
        companyName: 'Spherule Financial',
        serviceRequired: 'UI/UX',
        projectBudget: '$50,000 - $100,000',
        projectDeadline: '4 Weeks',
        projectDescription: 'Complete design system and interactive web prototype for a next-gen decentralized yield optimization platform featuring 3D glassmorphic cards and motion micro-interactions.',
        attachedFiles: JSON.stringify(['/uploads/spherule_brand_deck.pdf']),
        status: 'Completed',
        internalNotes: 'Project successfully delivered and deployed to production.',
      },
    ],
  });

  // Seed Opportunity Seekers
  await prisma.opportunitySeeker.createMany({
    data: [
      {
        userId: seekerUser.id,
        name: 'Alex Rivera',
        email: 'seeker@dev.io',
        phone: '+1 (555) 234-5678',
        role: 'Senior WebGL & Creative Frontend Architect',
        experience: '8+ Years',
        portfolioUrl: 'https://alexrivera.dev',
        githubUrl: 'https://github.com/arivera-gl',
        linkedinUrl: 'https://linkedin.com/in/alex-rivera-creative',
        introduction: 'Passionate Creative Technologist specializing in Three.js, custom GLSL shaders, Next.js performance optimization, and immersive WebGL user interfaces.',
        resumeFile: '/uploads/alex_rivera_resume.pdf',
        status: 'Shortlisted',
        internalNotes: 'Strong portfolio with custom WebGL shader demos. Scheduled technical interview for Thursday.',
      },
      {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@ai-labs.org',
        phone: '+1 (555) 987-6543',
        role: 'Lead AI / LLM Pipeline Engineer',
        experience: '6+ Years',
        portfolioUrl: 'https://priyasharma.ai',
        githubUrl: 'https://github.com/psharma-ai',
        linkedinUrl: 'https://linkedin.com/in/dr-priya-sharma',
        introduction: 'PhD in Computer Science with focus on Retrieval-Augmented Generation (RAG), vector databases (Qdrant/Pinecone), and low-latency LLM agent orchestration.',
        resumeFile: '/uploads/priya_sharma_cv.pdf',
        status: 'Selected',
        internalNotes: 'Exceptional background in AI infrastructure. Offer letter extended.',
      },
      {
        name: 'Julian Vance',
        email: 'julian.vance@motiondesign.co',
        phone: '+1 (555) 345-6789',
        role: 'Principal Motion UI/UX Designer',
        experience: '5+ Years',
        portfolioUrl: 'https://julianvance.design',
        githubUrl: 'https://github.com/jvance-design',
        linkedinUrl: 'https://linkedin.com/in/julian-vance-motion',
        introduction: 'Specializing in high-end luxury brand digital design systems, Framer Motion micro-interactions, Figma component libraries, and interactive visual storyboards.',
        resumeFile: '/uploads/julian_vance_portfolio.pdf',
        status: 'New',
        internalNotes: 'Fresh application received. Reviewing design showcase.',
      },
    ],
  });

  console.log('BreakX Database Seed Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
