export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  image?: string; // Placeholder for future use
  category: 'fullstack' | 'automation';
}

export const projects: Project[] = [
  // FULL STACK PROJECTS (Top 6 for the 3x2 Grid)
  {
    title: "Taskletix",
    description: "Bespoke client project focusing on high-performance athlete tracking and performance analytics.",
    tags: ["Next.js", "GSAP", "D3.js", "Supabase"],
    liveUrl: "https://taskletix.onrender.com/",
    category: 'fullstack'
  },
  {
    title: "SP Collections",
    description: "Luxury e-commerce experience featuring dynamic filtering, cart management, and a high-end UI.",
    tags: ["Next.js", "Shopify API", "Framer Motion", "Tailwind"],
    liveUrl: "https://sp-collections.netlify.app/",
    category: 'fullstack'
  },
  {
    title: "Smart Waste Management",
    description: "IoT-integrated platform for real-time waste level monitoring and route optimization for collection.",
    tags: ["React Native", "Node.js", "IoT", "Google Maps API"],
    liveUrl: "https://swatchmitra-frontend.onrender.com",
    category: 'fullstack'
  },
  {
    title: "Online Complaint Submission",
    description: "Digital governance portal for citizens to submit and track grievances with automated routing to departments.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    githubUrl: "https://github.com/Prasanthanupoju/online-complaint-submission",
    category: 'fullstack'
  },
  {
    title: "Book A Bunk",
    description: "A premium hostel booking platform with real-time availability and seamless payment integration.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/Prasanthanupoju/book-a-bunk.git",
    category: 'fullstack'
  },
  {
    title: "ECT Cloud Vault",
    description: "Secure enterprise-grade cloud storage solution with end-to-end encryption and collaborative features.",
    tags: ["React", "Firebase", "Cloud Storage", "Tailwind CSS"],
    githubUrl: "https://github.com/Prasanthanupoju/ECT-CloudVault.git",
    category: 'fullstack'
  },


  // N8N / AI AUTOMATION PROJECTS (Maintained as is)
  {
    title: "Finance CRM / ERM",
    description: "Automated financial workflow system integrating CRM data with real-time ERM processing via n8n.",
    tags: ["n8n", "AI", "PostgreSQL", "Automation"],
    liveUrl: "#",
    category: 'automation'
  },
  {
    title: "AI Powered Form Reply",
    description: "Intelligent lead response system that analyzes form submissions and generates personalized human-like replies.",
    tags: ["OpenAI", "n8n", "Typeform", "SMTP"],
    liveUrl: "#",
    category: 'automation'
  },
  {
    title: "Customer Support AI Agent",
    description: "Autonomous AI agent capable of handling complex customer queries with RAG-based knowledge retrieval.",
    tags: ["LangChain", "OpenAI", "Pinecone", "n8n"],
    liveUrl: "#",
    category: 'automation'
  },
  {
    title: "AI Marketing Ecosystem 2026",
    description: "The future of digital marketing: a fully autonomous content generation and distribution ecosystem.",
    tags: ["AI Content", "Automation", "Multi-agent Systems"],
    liveUrl: "#",
    category: 'automation'
  }
];

