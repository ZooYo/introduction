/* ------------------------------------------------------------
   English content. Edit this file to change the text on screen.
   Inline markup: **bold**, `code`
   ------------------------------------------------------------ */
window.INTRO_CONTENTS = window.INTRO_CONTENTS || {};
window.INTRO_CONTENTS.en = {
  lang: "en",
  meta: {
    name: "Luke Hsiao",
    role: "Senior Backend Engineer",
    pageTitle: "Luke Hsiao | Introduction",
  },
  labels: { problem: "Problem", solution: "Solution", result: "Outcome" },

  slides: [
    // ---------------------------------------------------------- 1. Cover
    {
      id: "cover",
      type: "cover",
      navLabel: "Cover",
      eyebrow: "Introduction",
      nameSecondary: "蕭祖佑 · Chu-Yu Hsiao",
      name: "Luke Hsiao",
      role: "Senior Backend Engineer",
      tagline: "5+ years of Python / AWS backend experience, focused on turning messy real-world documents and large datasets into reliable, automated systems.",
      stack: ["Python", "FastAPI / Chalice", "AWS Lambda · S3 · EventBridge", "MySQL", "Docker"],
      contact: ["chuyu.hsiao.tw@gmail.com", "Taipei, Taiwan"],
      hint: "Arrow keys / space to navigate · F for fullscreen",
      facts: [
        { k: "Now", v: "Pacston · Backend lead, online immigration document platform" },
        { k: "Experience", v: "5+ years backend (Pacston, MaideaX)" },
        { k: "Today", v: "1 current project + 2 highlight projects, about 8 minutes" },
      ],
    },

    // ---------------------------------------------------------- 2. About
    {
      id: "about",
      type: "about",
      navLabel: "About me",
      eyebrow: "01 · About me",
      title: "I build backend systems from zero to stable.",
      summary:
        "I mainly build web backend services in Python with FastAPI, Chalice and AWS serverless. I'm strongest at asynchronous data processing, database design and performance tuning, and I'm used to talking directly with PMs, end users and client attorneys.",
      stats: [
        { num: "5+", label: "years of backend work" },
        { num: "240M", label: "academic records processed" },
        { num: "94%", label: "faster parsing" },
        { num: "-64%", label: "document errors & complaints" },
      ],
      highlights: [
        { icon: "01", title: "Document automation", text: "End-to-end pipeline for PDF extraction, classification, validation and auto-fill, with a human-in-the-loop safety net." },
        { icon: "02", title: "Scale & async processing", text: "Lambda, EventBridge, state machines and idempotent workers for hundred-million-row datasets and batch syncs." },
        { icon: "03", title: "Database design & tuning", text: "Schema, indexes and partitioning; profiling to find real bottlenecks and fix N+1 queries." },
        { icon: "04", title: "Communication & mentoring", text: "Onboarded juniors to ship independently within 12 weeks; replace open-ended questions with concrete options." },
      ],
      timelineTitle: "Experience",
      timeline: [
        { when: "2023.06 – now", title: "Pacston · Senior Software Engineer", text: "Immigration package platform, academic document platform" },
        { when: "2020.03 – 2022.03", title: "MaideaX · Software Engineer", text: "Third-party payment sites, zero-downtime Docker deploys, automation" },
        { when: "2019.02 – 2019.07", title: "WPG Holdings · Intern", text: "Spring Boot APIs, automation testing" },
        { when: "2015 – 2019", title: "NYUST · Information Management", text: "GPA 3.77 / 4.0 · TOEIC 930" },
      ],
      skillsTitle: "Skills",
      skills: ["Python", "FastAPI", "Chalice", "AWS Lambda", "EventBridge", "S3", "CloudWatch", "MySQL", "Docker", "Pydantic", "OpenAI API", "Git"],
    },

    // ---------------------------------------------------------- 3. Project A
    {
      id: "project-a",
      type: "project",
      navLabel: "Project A · Immigration platform",
      eyebrow: "02 · Current project",
      period: "2025.03 – now",
      role: "Sole backend owner (1 PM, 1 frontend, 1 backend, AI team joined later)",
      title: "Online Immigration Package Platform",
      tagline: "Documents uploaded by attorneys and clients are converted, version-checked, classified, validated and auto-filled, so the package team only does the final review.",
      tech: ["Python", "FastAPI", "AWS Lambda", "EventBridge Scheduler", "S3", "MySQL", "PyMuPDF", "OpenAI API", "Pydantic"],
      problem: [
        "The package team manually reviewed hundreds of PDFs a day: identify the document type, check the **USCIS form edition date**, classify it and key in fields by hand.",
        "Fatigue led to outdated forms or misplaced documents, and a whole package would be rejected by USCIS, generating support tickets.",
        "Inputs were messy: client uploads, an internal CMS, zip files, Word docs, images and scans.",
      ],
      solution: [
        { label: "Standardize:", text: "unzip recursively, convert Word and images into PDF." },
        { label: "Hybrid extraction:", text: "PyMuPDF reads edition dates and fields from digital PDFs; scanned files fall back to OpenAI OCR. Every output is validated with Pydantic." },
        { label: "Classify & cross-check:", text: "an AI classification API routes files into exhibit sections; data is compared with the CMS questionnaire, mismatches are flagged and empty fields auto-filled." },
        { label: "Async sync system:", text: "Lambda + EventBridge Scheduler with a per-file state machine (Pending / Processing / Done / Error), automatic retries and idempotency." },
        { label: "Human-in-the-loop:", text: "low-confidence results are flagged; the team and attorneys approve before anything is packaged and filed." },
      ],
      stat: { num: "-64%", label: "document errors & related complaints" },
      result: [
        "**200+ documents per batch** processed asynchronously; a 15–20 minute AI classification feels instant thanks to a pre-computation (\"virtual model\") strategy.",
        "Built a USCIS update monitor that parses changes and emails partner attorneys automatically.",
        "Mentored a junior engineer to ship features independently within 12 weeks.",
      ],
      flow: [
        { label: "Upload / CMS", sub: "zip · Word · image · PDF" },
        { label: "Convert", sub: "to PDF" },
        { label: "Extract", sub: "PyMuPDF → OCR fallback", hl: true },
        { label: "Validate", sub: "Pydantic · edition date" },
        { label: "Classify / Compare", sub: "AI API · CMS questionnaire", hl: true },
        { label: "Human review", sub: "Approve" },
        { label: "Package & file" },
      ],
    },

    // ---------------------------------------------------------- 4. Project B
    {
      id: "project-b",
      type: "project",
      navLabel: "Project B · 240M records",
      eyebrow: "03 · Highlight project",
      period: "2023 – 2024",
      role: "Academic document platform · backend",
      title: "Importing and parsing 240M academic records",
      tagline: "Under deadline and budget pressure, loaded 240 million MAKG RDF records into our database and cut parsing time by 94% through profiling and Regex.",
      tech: ["Python", "AWS Lambda", "EC2", "MySQL", "Regex", "Pydantic", "Profiling"],
      problem: [
        "First time working at this scale. The initial plan used Lambda to fetch data with concurrent API calls, but **a benchmark showed the AWS cost was far too high**.",
        "Switched to parsing raw files on EC2, but rdflib parsed the entire RDF structure and was far too slow. We were about to miss the deadline.",
        "Regex is fast but risky: edge cases such as multi-line values could break parsing.",
      ],
      solution: [
        { label: "Measure before deciding:", text: "benchmarked every option and proactively updated my manager and DevOps; we moved from Lambda to EC2 to control cost." },
        { label: "Profile the bottleneck:", text: "the time went into rdflib parsing fields we never used. I extracted only the needed fields with Regex pattern matching." },
        { label: "Validation as a safety net:", text: "every row goes through Pydantic; failures are logged and re-run later, so a crash never loses data." },
        { label: "Partition the table:", text: "partitioned by publication year to match how academic data is queried (recent data is hot)." },
      ],
      stat: { num: "94%", label: "less parsing time per file (72s → 5s)" },
      result: [
        "The full dataset was imported **on time and under budget**.",
        "Extended into a daily OpenAlex sync pipeline (S3 polling, logging, notifications) replacing quarterly manual updates.",
        "Lesson: optimize the code before buying hardware; under pressure, pragmatic beats fancy.",
      ],
      flow: [
        { label: "Lambda + API", sub: "too expensive ✗" },
        { label: "EC2 + rdflib", sub: "72 s / file ✗" },
        { label: "split / replace", sub: "12 s / file" },
        { label: "Regex", sub: "5 s / file ✓", hl: true },
        { label: "Pydantic", sub: "log & re-run failures" },
        { label: "MySQL", sub: "partition by year" },
      ],
    },

    // ---------------------------------------------------------- 5. Project C
    {
      id: "project-c",
      type: "project",
      navLabel: "Project C · Internal chat",
      eyebrow: "04 · Highlight project",
      period: "2023 – 2024",
      role: "Database design & API development",
      title: "Internal real-time chat application",
      tagline: "A Google Chat–style internal messaging tool, designed from schema to API, serving 100+ users.",
      tech: ["Python", "MySQL", "Partition / Index", "WebSocket", "REST API"],
      problem: [
        "Needed spaces, groups, threads, messages, files and read status: a lot of relationships to model correctly.",
        "The message table grows forever, yet query latency had to stay acceptable.",
        "Early APIs had N+1 queries that slowed down noticeably as rooms multiplied.",
      ],
      solution: [
        { label: "Schema design:", text: "five core tables: space / member / thread / message / files. A thread is simply a space without a parent, which removes special cases." },
        { label: "Partitioning:", text: "messages partitioned by `HASH(space_id)` into 100 partitions with a composite key (id, space_id), so one room's messages live together; files use LIST partitions by type." },
        { label: "Performance tuning:", text: "fixed N+1 with maps and `IN (ids)`; after observing usage, filter out threads first to cut the scanned rows." },
        { label: "Real-time delivery:", text: "WebSocket pushes new messages and read status." },
      ],
      stat: { num: "100+", label: "internal users in daily use" },
      result: [
        "Delivered end-to-end, from database architecture to API, and became the company's daily communication tool.",
        "Partition and index design kept queries stable as message volume grew.",
        "Related work: moved access logs to CloudWatch via middleware and visualized Nginx logs with GoAccess for traffic alerts.",
      ],
      flow: [
        { label: "Client", sub: "Web" },
        { label: "REST API", sub: "Python" },
        { label: "WebSocket", sub: "real-time push", hl: true },
        { label: "MySQL", sub: "message HASH(space_id) × 100", hl: true },
        { label: "files", sub: "LIST partition by type" },
      ],
    },

    // ---------------------------------------------------------- 6. Closing
    {
      id: "closing",
      type: "closing",
      navLabel: "Closing",
      eyebrow: "05 · Wrap-up",
      title: "Thank you. Happy to take questions.",
      lead: "I enjoy solving problems and I care about clear communication. I'd like to bring my experience in document automation and reliable systems to the next team.",
      points: [
        { title: "Pragmatic", text: "Benchmark first, profile second; let data pick the architecture, not trends." },
        { title: "Reliable", text: "State machines, idempotency, validation layers and regression tests so systems recover on their own." },
        { title: "Communicative", text: "Talk directly with PMs, attorneys and frontend; replace vague descriptions with concrete options and examples." },
      ],
      contact: ["chuyu.hsiao.tw@gmail.com", "Luke Hsiao · 蕭祖佑"],
    },
  ],
};
