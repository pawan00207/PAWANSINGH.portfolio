export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI/ML' | 'Healthcare' | 'Safety & Emergency' | 'Web Applications' | 'Developer Tools' | 'Hackathons';
  isFlagship: boolean;
  repoUrl: string;
  altRepoUrl?: string;
  demoUrl?: string;
  huggingFaceUrl?: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  keyFeatures: string[];
  technologies: string[];
  highlightMetric?: string;
  status: 'Active' | 'Hackathon Prototype' | 'Open Source' | 'In Development';
  visualTheme: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  subheadline: string;
  bio: string;
  education: {
    degree: string;
    institution: string;
    university: string;
    graduationYear: number;
    cgpa: string;
    location: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    leetcode: string;
    resumeUrl: string;
  };
  skills: {
    category: string;
    items: string[];
    description: string;
  }[];
  achievements: {
    id: string;
    title: string;
    eventOrCategory: string;
    award: string;
    status: 'Verified Academic' | 'Reported Achievement' | 'Hackathon Project';
    date: string;
    description: string;
    relatedProject?: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Pawan Singh",
  headline: "Full Stack Developer | AI Builder",
  subheadline: "Building intelligent products, robust full-stack systems, and immersive digital experiences.",
  bio: "Computer Science Engineering student at Delhi Technical Campus (DTC), affiliated with Guru Gobind Singh Indraprastha University (GGSIPU). Passionate about architecting scalable full-stack applications, intelligent AI workflows, and resilient emergency response systems. Strong foundational background in Java, Data Structures & Algorithms, C, React, and modern cloud databases.",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Delhi Technical Campus (DTC)",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    graduationYear: 2028,
    cgpa: "9.16",
    location: "Greater Noida / Delhi NCR, India"
  },
  contact: {
    email: "pawan9140582015@gmail.com",
    github: "https://github.com/pawan00207",
    linkedin: "https://www.linkedin.com/in/pawan-singh-555423322/",
    leetcode: "https://leetcode.com/u/pawansingh2005/",
    resumeUrl: "/resume.pdf"
  },
  skills: [
    {
      category: "Core Languages & Foundations",
      items: ["Java", "DSA in Java", "C", "JavaScript (ES6+)", "TypeScript", "SQL"],
      description: "Rigorous object-oriented programming, algorithmic problem solving, memory foundations, and relational querying."
    },
    {
      category: "Frontend & Creative Tech",
      items: ["React", "Three.js", "Tailwind CSS", "HTML5", "CSS3", "WebGL", "Responsive Web Design"],
      description: "Modern component architectures, interactive 3D procedural scenes, and ergonomic responsive user interfaces."
    },
    {
      category: "Backend & Data Storage",
      items: ["MongoDB", "MySQL", "REST APIs", "Node.js Express", "Database Indexing", "Session Security"],
      description: "Document and relational database persistence, schema modeling, and backend service integrations."
    },
    {
      category: "Engineering & Tooling",
      items: ["Git", "GitHub", "Vite", "Basic Figma", "AI Integration", "Prompt Engineering"],
      description: "Version control workflows, collaborative pull requests, UI prototyping, and multi-model AI API implementations."
    }
  ],
  achievements: [
    {
      id: "cgpa-milestone",
      title: "Outstanding Academic Standing",
      eventOrCategory: "Delhi Technical Campus (GGSIPU)",
      award: "9.16 CGPA",
      status: "Verified Academic",
      date: "2024 – Present",
      description: "Maintaining top-tier academic excellence in B.Tech Computer Science Engineering with rigorous focus on computer systems, DSA, and mathematics."
    },
    {
      id: "mediverse-award",
      title: "1st Place – Healthcare Innovation Track",
      eventOrCategory: "Healthcare Hackathon (Reported)",
      award: "First Place Winner",
      status: "Reported Achievement",
      date: "2025",
      description: "Recognized for architecting MediVerse.AI: an integrated healthcare triage system unifying urgency routing, AI diagnostics, and teleconsultation.",
      relatedProject: "mediverse-ai"
    },
    {
      id: "swasth-saathi-award",
      title: "Top-3 Placement – Social Impact",
      eventOrCategory: "HealthTech Challenge (Reported)",
      award: "Top 3 Finalist",
      status: "Reported Achievement",
      date: "2025",
      description: "Awarded for Swasth-Saathi: decentralized healthcare access platform connecting local clinics, pharmacies, and patient record management.",
      relatedProject: "swasth-saathi"
    },
    {
      id: "hackindia-2026",
      title: "Team Builder – 404 Brains Not Found",
      eventOrCategory: "HackIndia AI & Web3 Builders Hackathon 2026",
      award: "Official Competitor & Project Submission",
      status: "Hackathon Project",
      date: "2026",
      description: "Developed AI and decentralized application architecture collaborating with a high-intensity hackathon sprint team.",
      relatedProject: "hackindia-2026"
    }
  ]
};

export const PROJECTS_DATA: Project[] = [
  // FLAGSHIP 1
  {
    id: "mediverse-ai",
    title: "MediVerse.AI",
    subtitle: "AI-Powered Healthcare Ecosystem & Unified Triage",
    category: "Healthcare",
    isFlagship: true,
    repoUrl: "https://github.com/pawan00207/v0-medi-verse-ai-healthcare-ecosystem",
    demoUrl: "",
    summary: "Comprehensive digital healthcare platform integrating intelligent patient urgency assessment, teleconsultation scheduling, digital health records, and emergency dispatch routing.",
    problem: "Patients face severe friction navigating fragmented healthcare systems: triage delays, inaccessible doctor booking, lost paper medical histories, and slow critical diagnostics.",
    solution: "Engineered an AI-assisted triage assessment system that categorizes symptom urgency, suggests specialized care paths, streamlines doctor consultations, and centralizes patient records.",
    architecture: [
      "Client Tier: React + TypeScript with responsive urgency assessment workflows and real-time appointment booking.",
      "Intelligence Layer: Structured symptom intake engine with multi-factor risk categorization (mild, moderate, emergency).",
      "Record Management: Centralized patient health profiles with secure prescription storage and diagnostic history.",
      "Teleconsultation Module: Dynamic scheduling coordinating doctor availability and instant consultation links."
    ],
    keyFeatures: [
      "Intelligent symptom triage & urgency categorization",
      "Direct doctor-patient teleconsultation pipeline",
      "Unified digital health record repository",
      "Fast pharmacy & diagnostic lab request workflows"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "AI Integration", "Node.js", "REST APIs"],
    highlightMetric: "1st Place Track Winner",
    status: "Hackathon Prototype",
    visualTheme: "Holographic Medical Hub & Neural Triage Matrix"
  },

  // FLAGSHIP 2
  {
    id: "swasth-saathi",
    title: "Swasth-Saathi",
    subtitle: "Community Healthcare Access & Wellness Network",
    category: "Healthcare",
    isFlagship: true,
    repoUrl: "https://github.com/pawan00207/Swasth-Saathi",
    altRepoUrl: "https://github.com/pawan00207/SwasthSaarthi",
    demoUrl: "",
    summary: "Healthcare accessibility ecosystem linking patients, neighborhood clinics, pharmacies, and mental wellness resources with bilingual support.",
    problem: "Under-served communities often lack accessible real-time visibility into local doctor availability, essential medicine stocks at nearby pharmacies, and compassionate mental health support.",
    solution: "Built a community-first digital hub offering verified clinic listings, real-time pharmacy availability flags, intuitive mental wellness check-ins, and emergency helpline dialers.",
    architecture: [
      "Decentralized Resource Directory: Searchable catalog of certified clinics, dispensaries, and registered pharmacies.",
      "Pharmacy Inventory Signals: Localized stock availability indicators for essential medicines.",
      "Mental Wellness Suite: Self-guided stress relief assessments and confidential support resources.",
      "Accessibility Core: High-contrast typography, mobile-first performance, and low-bandwidth resilience."
    ],
    keyFeatures: [
      "Clinic and diagnostic center geo-lookup",
      "Essential pharmacy stock tracking",
      "Mental health self-assessment & guided wellness",
      "One-tap emergency medical hotline access"
    ],
    technologies: ["JavaScript", "React", "HTML5", "CSS3", "Git", "REST APIs"],
    highlightMetric: "Top 3 Placement",
    status: "Active",
    visualTheme: "Connected Hospital & Community Clinic Web"
  },

  // FLAGSHIP 3
  {
    id: "trafficguard-pro",
    title: "TrafficGuard Pro",
    subtitle: "AI Traffic Safety & Intelligent Enforcement Grid",
    category: "AI/ML",
    isFlagship: true,
    repoUrl: "https://github.com/pawan00207", // Configurable profile link until dedicated repository is published
    demoUrl: "",
    huggingFaceUrl: "https://huggingface.co", // Configurable HF demo link
    summary: "Computer vision and AI-assisted traffic monitoring concept designed to detect violations, track vehicle trajectories, and streamline automated e-challan generation.",
    problem: "Urban transit systems suffer from dangerous red-light violations, lane indiscipline, helmet-less riding, and delayed manual law enforcement.",
    solution: "Designed an automated video stream processing pipeline with bounding box vehicle tracking, optical license recognition integration, and rule-violation logging.",
    architecture: [
      "Video Intake: High-framerate road surveillance feed ingestion.",
      "Detection Pipeline: Object detection models distinguishing cars, two-wheelers, heavy vehicles, and pedestrian crossings.",
      "Violation Engine: Boundary line collision detection (red light running, wrong-way driving, speed anomalies).",
      "Enforcement Dashboard: Administrative console for evidence playback and incident review."
    ],
    keyFeatures: [
      "Multi-class vehicle trajectory tracking",
      "Automatic number-plate capture concept",
      "Speed threshold & lane violation alerts",
      "Auditable incident review dashboard"
    ],
    technologies: ["Python", "Computer Vision", "AI Models", "JavaScript", "React"],
    highlightMetric: "Safety & Vision AI",
    status: "In Development",
    visualTheme: "Cinematic Smart-Road Grid & Luminous Traffic Nodes"
  },

  // FLAGSHIP 4
  {
    id: "resqmap-app",
    title: "ResQMap",
    subtitle: "Rapid Disaster Emergency Response & Hazard Mapping",
    category: "Safety & Emergency",
    isFlagship: true,
    repoUrl: "https://github.com/pawan00207/ResQMap-App",
    altRepoUrl: "https://github.com/pawan00207/Disaster-Resque",
    demoUrl: "",
    summary: "Real-time crisis navigation and rescue coordinate platform delivering live terrain danger zones, safe evacuation corridors, and rescue team beacons.",
    problem: "Natural catastrophes (floods, earthquakes, landslides) destroy standard navigation routes, causing rescue teams to enter hazardous areas and stranding civilians.",
    solution: "Implemented an interactive topographic emergency map showing dynamic danger polygons, marked relief shelters, real-time SOS pins, and clear evacuation pathways.",
    architecture: [
      "Spatial Map Canvas: Topographic visualization with elevation and flood/hazard perimeter shading.",
      "SOS Beacon Protocol: Low-bandwidth distress signaling pinpointing GPS coordinates and survivor counts.",
      "Route Optimization: Hazard-avoidance path calculation steering victims away from active danger zones.",
      "Rescue Dispatch Matrix: Operational view for first-responders to claim and prioritize SOS calls."
    ],
    keyFeatures: [
      "Dynamic disaster hazard contour mapping",
      "One-click offline-capable SOS broadcast",
      "Verified evacuation shelters & medical points",
      "Multi-agency rescue dispatch coordination"
    ],
    technologies: ["React", "JavaScript", "Leaflet/Mapbox API", "CSS3", "Git"],
    highlightMetric: "Disaster Tech",
    status: "Active",
    visualTheme: "3D Topographic Terrain & Luminous Rescue Beacons"
  },

  // ADDITIONAL REPOSITORIES (ALL 18 PROJECTS PRESENT)
  {
    id: "disaster-resque",
    title: "Disaster-Resque",
    subtitle: "Emergency Disaster Management & Evacuation System",
    category: "Safety & Emergency",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/Disaster-Resque",
    summary: "Dedicated disaster response portal focused on rapid relief coordination, resource tracking, and survivor requests during critical environmental emergencies.",
    problem: "Disorganized relief distribution results in critical supplies missing stranded populations during flood or earthquake scenarios.",
    solution: "A focused emergency portal for volunteers and victims to log supply needs, relief camp locations, and volunteer deployment rosters.",
    architecture: ["Responsive web UI for field workers", "Request categorization by urgency", "Relief inventory catalog"],
    keyFeatures: ["Supply request submission", "Camp capacity tracker", "Volunteer dispatch board"],
    technologies: ["JavaScript", "HTML5", "CSS3", "Git"],
    status: "Active",
    visualTheme: "Emergency Response Hub"
  },
  {
    id: "hackindia-2026",
    title: "HackIndia AI & Web3 — 404 Brains Not Found",
    subtitle: "Hackathon Sprint Prototype Repository",
    category: "Hackathons",
    isFlagship: false,
    repoUrl: "https://github.com/HackIndiaXYZ/hackindia-ai-web3-builders-hackathon-2026-404-brains-not-found",
    summary: "Official hackathon submission repository for HackIndia 2026, building smart AI agents and decentralized data verification architecture.",
    problem: "Bridging real-world data validation with decentralized transparency and AI-guided decision pipelines.",
    solution: "Collaborative prototype integrating intelligent verification nodes and decentralized event tracking.",
    architecture: ["Collaborative sprint repository", "AI reasoning engine", "Proof verification module"],
    keyFeatures: ["Hackathon sprint codebase", "Collaborative team architecture", "AI agent experiments"],
    technologies: ["JavaScript", "AI APIs", "Web3 Concepts", "Git"],
    status: "Hackathon Prototype",
    visualTheme: "Decentralized AI Grid"
  },
  {
    id: "spacexayurveda",
    title: "SpaceXayurveda",
    subtitle: "Botanical Research & Traditional Wellness Portal",
    category: "Web Applications",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/SpaceXayurveda",
    summary: "Curated research portal exploring botanical remedies, Ayurvedic formulations, and modern wellness taxonomies in a clean web interface.",
    problem: "Traditional wellness knowledge is often scattered, unstructured, and difficult to cross-reference with modern pharmacological ingredients.",
    solution: "Structured digital catalog of botanical herbs, properties, constitutional balance guides, and preparation methods.",
    architecture: ["Searchable botanical index", "Category filter by therapeutic benefit", "Responsive mobile-first layout"],
    keyFeatures: ["Herbal remedy index", "Ingredient interaction notes", "Clean reading interface"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Git"],
    status: "Active",
    visualTheme: "Botanical Knowledge Graph"
  },
  {
    id: "ait-hub",
    title: "AiT-Hub",
    subtitle: "AI Tools & Developer Resources Directory",
    category: "Developer Tools",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/AiT-Hub",
    summary: "Centralized catalog for discovering, categorizing, and bookmarking emerging generative AI tools, SDKs, and developer utilities.",
    problem: "Rapid proliferation of AI tools makes it difficult for developers and creators to track tested, reliable AI utilities.",
    solution: "Curated directory with category tags, pricing indicators, API availability flags, and direct documentation links.",
    architecture: ["Dynamic filtering by capability (code, vision, text)", "Search indexing", "Clean bookmarking UI"],
    keyFeatures: ["Categorized tool directory", "Fast text search", "Developer stack recommendations"],
    technologies: ["JavaScript", "HTML5", "Tailwind CSS", "Git"],
    status: "Active",
    visualTheme: "Developer Tool Matrix"
  },
  {
    id: "womensafetywebapp",
    title: "WomenSafetyWebApp",
    subtitle: "Personal Security, Geolocation & Rapid Alert System",
    category: "Safety & Emergency",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/WomenSafetyWebApp",
    summary: "Empowering safety web application with instant emergency contact dispatch, live location sharing, safe route guides, and police hotline shortcuts.",
    problem: "Commuters travelling through unfamiliar or poorly lit areas require quick, discreet mechanisms to broadcast their live location to trusted guardians.",
    solution: "Single-tap emergency trigger broadcasting GPS coordinates, pre-set SMS triggers, and rapid dialing to nearest emergency dispatch.",
    architecture: ["HTML5 Geolocation API integration", "One-touch SOS trigger", "Local guardian phonebook sync"],
    keyFeatures: ["Instant location broadcast", "Emergency helpline shortcuts", "Safe zone indicators"],
    technologies: ["JavaScript", "HTML5 Geolocation", "CSS3", "Git"],
    status: "Active",
    visualTheme: "Guardian Shield Interface"
  },
  {
    id: "ai-dashboard",
    title: "AI Dashboard",
    subtitle: "Analytics, Model Performance & Metric Monitoring",
    category: "AI/ML",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/ai-dashboard",
    summary: "Interactive monitoring dashboard displaying AI usage metrics, API response latency, token consumption, and model inference trends.",
    problem: "AI application builders lack simple, focused dashboards to observe request volumes, cost projections, and error spikes in one place.",
    solution: "Clean metric visualization suite with interactive charts, latency percentiles, and request volume timelines.",
    architecture: ["Component-driven dashboard UI", "Configurable mock metrics & chart components", "Filter by model engine"],
    keyFeatures: ["Token burn rate charts", "Latency distribution", "Endpoint status monitors"],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Chart.js"],
    status: "Active",
    visualTheme: "Telemetry & Telemetry Stream"
  },
  {
    id: "demand-forecast",
    title: "Demand Forecast",
    subtitle: "Supply Chain & Inventory Predictive Modeling",
    category: "AI/ML",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/demand-forecast",
    summary: "Data-driven demand prediction model designed to forecast inventory requirements, seasonal spikes, and prevent overstocking.",
    problem: "Small retailers and suppliers incur substantial losses through inaccurate inventory purchasing and sudden supply bottlenecks.",
    solution: "Predictive estimation algorithm utilizing historical sales inputs to project expected weekly and monthly inventory demand.",
    architecture: ["Data parsing & tabular input", "Regression / moving-average forecasting logic", "Visualization of projected stock"],
    keyFeatures: ["Historical sales data ingestion", "Trend extrapolation", "Reorder point alerts"],
    technologies: ["Python / JavaScript", "Data Analysis", "CSS3", "Git"],
    status: "Active",
    visualTheme: "Predictive Analytics Curve"
  },
  {
    id: "eventhub",
    title: "EventHub",
    subtitle: "Campus & Community Event Management Platform",
    category: "Web Applications",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/eventhub",
    summary: "Web application for creating, managing, and discovering college hackathons, technical workshops, and cultural fests.",
    problem: "College events suffer from fragmented publicity across messaging groups, leading to missed registration deadlines and empty halls.",
    solution: "Unified portal where student societies publish agendas, manage RSVP limits, and attendees register seamlessly.",
    architecture: ["Event creation form with validation", "Categorized event gallery", "Registration confirmation pipeline"],
    keyFeatures: ["Event calendar view", "RSVP tracking", "Category tags for tech, culture, and sports"],
    technologies: ["React", "JavaScript", "HTML5", "CSS3"],
    status: "Active",
    visualTheme: "Interactive Community Calendar"
  },
  {
    id: "pagevault",
    title: "PageVault",
    subtitle: "Encrypted Note-Taking & Document Storage",
    category: "Developer Tools",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/PageVault",
    summary: "Minimalist, private document notebook with local-storage persistence, markdown parsing, and clean reader mode.",
    problem: "Heavy note apps are bloated with distractions, slow sync conflicts, and intrusive account requirements for simple developer notes.",
    solution: "Fast, distraction-free markdown vault storing notes securely in the browser with instant export and search.",
    architecture: ["Markdown rendering engine", "LocalStorage persistence", "Instant tag filter and full-text search"],
    keyFeatures: ["Live Markdown preview", "Local encrypted storage support", "Single-click markdown download"],
    technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage API"],
    status: "Active",
    visualTheme: "Monospace Markdown Terminal"
  },
  {
    id: "swasthsaarthi-alt",
    title: "SwasthSaarthi (Alternative Repo)",
    subtitle: "Healthcare Companion & Access Hub",
    category: "Healthcare",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/SwasthSaarthi",
    summary: "Alternative codebase and iteration for the Swasth-Saathi community health platform with refined interface components.",
    problem: "Rapid iteration during hackathons often spawns focused branch architectures that isolate UI experimentation.",
    solution: "Serves as the dedicated repository for secondary component tests, localized strings, and alternative navigation layouts.",
    architecture: ["Alternative component tree", "Focused wellness workflows"],
    keyFeatures: ["Accessible health checklists", "Responsive layout variations"],
    technologies: ["JavaScript", "CSS3", "HTML5"],
    status: "Active",
    visualTheme: "Clean Health Interface"
  },
  {
    id: "unitrack-system",
    title: "Unitrack System",
    subtitle: "University Academic Tracking & Attendance Portal",
    category: "Web Applications",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/Unitrack-system",
    summary: "Student academic tracker recording course attendance, semester credits, assignment deadlines, and target CGPA calculations.",
    problem: "College students struggle to project how individual absences impact their mandatory 75% attendance criteria and final grades.",
    solution: "Interactive attendance calculator and subject organizer warning students when attendance drops close to minimum thresholds.",
    architecture: ["Course subject grid", "Attendance percentage calculator with safe-cut estimates", "Assignment deadline alerts"],
    keyFeatures: ["75% attendance threshold predictor", "Credit and internal marks tracker", "Clean academic dashboard"],
    technologies: ["JavaScript", "React", "CSS3", "Git"],
    status: "Active",
    visualTheme: "Academic Tracker Dashboard"
  },
  {
    id: "ai-vision-assistant",
    title: "AI Vision Assistant",
    subtitle: "Assistive Object Recognition & Scene Description",
    category: "AI/ML",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/v0-ai-vision-assistant",
    summary: "Vision-enabled assistant converting camera feeds into descriptive text and audio descriptions for visually impaired users.",
    problem: "Individuals with visual impairments need quick, accessible auditory cues about their physical surroundings and text on signs or packaging.",
    solution: "Lightweight web interface allowing photo capture or live stream analysis with immediate AI scene narration.",
    architecture: ["MediaDevices camera stream capture", "Vision model query endpoint", "Speech synthesis playback"],
    keyFeatures: ["Surrounding object narration", "Text reading on captured signage", "Hands-free audio playback"],
    technologies: ["React", "Vision AI APIs", "Web Speech API", "CSS3"],
    status: "Active",
    visualTheme: "High-Contrast Assistive Viewfinder"
  },
  {
    id: "helping-hands-sih2018",
    title: "Helping Hands SIH 2018",
    subtitle: "Collaborative Social Welfare & Disaster Portal (SIH)",
    category: "Hackathons",
    isFlagship: false,
    repoUrl: "https://github.com/Ronak-59/Helping-Hands-SIH2018",
    summary: "Smart India Hackathon project repository focusing on civic welfare coordination and volunteer dispatch (collaborative open-source reference).",
    problem: "Coordinating decentralized disaster volunteers across regional NGOs without overlapping efforts or missed zones.",
    solution: "Collaborative portal connecting civic authorities with registered volunteers for coordinated relief task distribution.",
    architecture: ["Civic emergency incident reporting", "Volunteer task assignment table", "Regional coordination map"],
    keyFeatures: ["Collaborative open-source project", "Task verification flow", "Emergency supply requisition"],
    technologies: ["JavaScript", "HTML5", "CSS3", "Git"],
    status: "Open Source",
    visualTheme: "Civic Action Dispatch"
  },
  {
    id: "healthcare-main",
    title: "Healthcare Main",
    subtitle: "Core Patient & Hospital Management Engine",
    category: "Healthcare",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/healthcare-main",
    summary: "Foundation repository housing reusable healthcare components, doctor directory schemas, and appointment scheduling modules.",
    problem: "Building medical applications requires verified data structures for doctors, departments, and patient consent.",
    solution: "Reusable library of clinic data models, booking handlers, and medical form validators utilized across Pawan's health projects.",
    architecture: ["Reusable domain component library", "Form validation for patient intake", "Modular data structures"],
    keyFeatures: ["Standardized clinic schemas", "Input sanitization for health forms", "Modular UI components"],
    technologies: ["JavaScript", "HTML5", "CSS3"],
    status: "Active",
    visualTheme: "Clinical Data Architecture"
  },
  {
    id: "medivault-deerhack",
    title: "MediVault DeerHack",
    subtitle: "DeerHack Hackathon Medical Record Vault",
    category: "Hackathons",
    isFlagship: false,
    repoUrl: "https://github.com/pawan00207/MediVault-Deerhack-master",
    summary: "DeerHack hackathon project engineering a patient-sovereign medical vault ensuring records are accessible only with patient consent.",
    problem: "Hospital databases frequently silo medical history, creating dangerous blind spots when a patient visits a new hospital.",
    solution: "Portable patient-controlled record vault allowing instantaneous time-limited access codes for attending physicians.",
    architecture: ["Patient master record index", "Time-expiring doctor access keys", "Document upload and verification"],
    keyFeatures: ["Hackathon project sprint", "Patient-controlled permission grants", "Diagnostic report archive"],
    technologies: ["JavaScript", "React", "CSS3", "Git"],
    status: "Hackathon Prototype",
    visualTheme: "Encrypted Health Safe"
  }
];
