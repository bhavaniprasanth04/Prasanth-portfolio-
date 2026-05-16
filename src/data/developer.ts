export interface DeveloperStory {
   id: string;
   name: string;
   subName: string;
   role: string;
   description: string;
   folderPath: string;
   themeColor: string;
   gradient: string;
   features: string[];
   stats: { label: string; val: string }[];
   section1: { title: string; subtitle: string };
   section2: { title: string; subtitle: string };
   section3: { title: string; subtitle: string };
   section4: { title: string; subtitle: string };
   detailsSection: { title: string; description: string; imageAlt: string };
   freshnessSection: { title: string; description: string };
   hireSection: {
       headline: string;
       unit: string;
       processingParams: string[];
       deliveryPromise: string;
       returnPolicy: string;
   };
}

export const developerStory: DeveloperStory[] = [
   {
       id: "intro",
       name: "Prasanth Anupoju",
       subName: "Designing with code. Shipping with precision.",
       role: "Full Stack Developer | AI-Powered Web App Builder",
       description: "HTML, CSS, JavaScript, Next.js, Node.js, databases, and AI APIs.",
       folderPath: "/images/developer",
       themeColor: "#6C63FF",
       gradient: "linear-gradient(135deg, #0F172A 0%, #111827 55%, #1E3A8A 100%)",
       features: ["Responsive UI", "AI Integration", "Scalable Architecture"],
       stats: [{ label: "Projects", val: "20+" }, { label: "Stack", val: "Full" }, { label: "Focus", val: "Quality" }],
       section1: { title: "Prasanth Anupoju.", subtitle: "Building modern products end-to-end." },
       section2: { title: "Design meets engineering.", subtitle: "Turning complex ideas into clean, fast, user-first interfaces." },
       section3: { title: "Anti-gravity digital motion.", subtitle: "Floating particles, code shards, and cinematic UI energy." },
       section4: { title: "From concept to deployment.", subtitle: "" },
       detailsSection: {
           title: "About Me",
           description: "I'm a passionate full stack developer with a strong foundation in HTML, CSS, JavaScript, and backend technologies. I've developed responsive, user-centric web applications with a focus on clean design, functionality, and seamless user experiences. I'm especially interested in leveraging the latest AI tools and APIs to bring smart features and automation into the products I build.",
           imageAlt: "Developer Details"
       },
       freshnessSection: {
           title: "Beyond Coding",
           description: "I'm a collaborative team player who values communication, creativity, and continuous learning. I'm excited about opportunities where I can contribute to building innovative, intelligent products—while growing both personally and professionally."
       },
       hireSection: {
           headline: "Available for freelance and full-time opportunities.",
           unit: "Open to collaboration",
           processingParams: ["Frontend", "Backend", "AI APIs"],
           deliveryPromise: "Fast communication, strong ownership, and polished delivery for every project.",
           returnPolicy: "If the final product is not aligned with the brief, I refine it until it is."
       }
   },
   {
       id: "skills",
       name: "Technical Craft",
       subName: "Reusable systems. Smooth interactions.",
       role: "UI Engineering",
       description: "Tailwind CSS, Framer Motion, component architecture, and responsive design.",
       folderPath: "/images/developer",
       themeColor: "#22C55E",
       gradient: "linear-gradient(135deg, #052E16 0%, #064E3B 55%, #065F46 100%)",
       features: ["Component Design", "Motion Systems", "Responsive Layouts"],
       stats: [{ label: "UI", val: "Clean" }, { label: "Motion", val: "Smooth" }, { label: "Code", val: "Scalable" }],
       section1: { title: "UI Engineering.", subtitle: "Every pixel has a purpose." },
       section2: { title: "Motion with meaning.", subtitle: "Animation supports storytelling, not distraction." },
       section3: { title: "Responsive by default.", subtitle: "Layouts that adapt beautifully across devices." },
       section4: { title: "Built for real users.", subtitle: "" },
       detailsSection: {
           title: "Design Systems",
           description: "I build interfaces that can grow. That means reusable components, consistent spacing, accessible patterns, and a visual language that supports the product as it scales.",
           imageAlt: "Skills Details"
       },
       freshnessSection: {
           title: "Performance First",
           description: "The interface should load quickly, animate smoothly, and remain stable under real-world use. Clean code and thoughtful state management keep the experience dependable."
       },
       hireSection: {
           headline: "Focused on maintainable, high-performance web experiences.",
           unit: "Engineering mindset",
           processingParams: ["Reusable UI", "Fast Performance", "Accessible Design"],
           deliveryPromise: "Built with careful structure so future updates remain easy.",
           returnPolicy: "Refactoring and iteration are part of the process until the result is production-ready."
       }
   },
   {
       id: "projects",
       name: "Featured Work",
       subName: "Ideas turned into products.",
       role: "Product Development",
       description: "SaaS dashboards, landing pages, automation flows, and business websites.",
       folderPath: "/images/developer",
       themeColor: "#F97316",
       gradient: "linear-gradient(135deg, #3B0A0A 0%, #7C2D12 55%, #C2410C 100%)",
       features: ["Landing Pages", "Dashboards", "Automation"],
       stats: [{ label: "Delivery", val: "Fast" }, { label: "Scope", val: "Flexible" }, { label: "Outcome", val: "Impact" }],
       section1: { title: "Featured Work.", subtitle: "Products that feel premium." },
       section2: { title: "Business-focused delivery.", subtitle: "Built to support growth, trust, and usability." },
       section3: { title: "Scalable from day one.", subtitle: "Architecture that supports real product evolution." },
       section4: { title: "Ready to collaborate.", subtitle: "" },
       detailsSection: {
           title: "Production Thinking",
           description: "Great products are not just visually strong; they are structured to be shipped, maintained, and extended. I focus on reliable implementation and clear user journeys.",
           imageAlt: "Projects Details"
       },
       freshnessSection: {
           title: "Launch Ready",
           description: "Everything should feel ready for the real web: clear calls to action, thoughtful hierarchy, and an experience that leaves a strong impression."
       },
       hireSection: {
           headline: "Let’s build something that looks premium and works flawlessly.",
           unit: "Project-ready delivery",
           processingParams: ["UI/UX", "APIs", "Deployment"],
           deliveryPromise: "From prototype to polished production release.",
           returnPolicy: "Iteration and improvement continue until the product feels complete."
       }
   }
];
