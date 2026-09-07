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
  labels: {
    problem: "Problem", solution: "Solution", result: "Outcome",
    minutes: "min", seconds: "s",
    pickerBtn: "Projects", pickerTitle: "Choose the projects to present",
    pickerHint: "Tick and reorder; the deck updates instantly. Your choice is remembered and written into the URL, so you can keep one link per company.",
    pickerTotal: "Selected", pickerReset: "Reset to default", pickerCopy: "Copy this link", pickerCopied: "Copied ✓",
  },
  // Default projects and order (change any time with the "Projects" button)
  defaultProjects: ["project-a", "project-b", "project-c"],
  // Minutes for intro + closing, used for the time estimate
  baseMinutes: 2,

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
        { k: "Today", v: "{count} projects, within 5–10 minutes" },
      ],
    },

    // ---------------------------------------------------------- 2. About
    {
      id: "about",
      type: "about",
      navLabel: "About me",
      eyebrow: "About me",
      title: "Software engineer with 5+ years of experience",
      summary:
        "I mainly build web backend services in Python with FastAPI, and serverless services on AWS Lambda with Chalice. I'm strongest at asynchronous data processing, database design and performance tuning, and I'm used to talking directly with PMs, end users and client attorneys.",
      highlights: [
        { icon: "01", title: "Document automation", text: "End-to-end pipeline for PDF extraction, classification, validation and auto-fill, with a human-in-the-loop safety net." },
        { icon: "02", title: "Scale & async processing", text: "Lambda, EventBridge, state machines and idempotent workers for hundred-million-row datasets and batch syncs." },
        { icon: "03", title: "Database design & tuning", text: "Schema, indexes and partitioning; profiling to find real bottlenecks and fix N+1 queries." },
        { icon: "04", title: "Communication & mentoring", text: "Replace open-ended questions with concrete options to cut back-and-forth; onboarded juniors to ship independently within 12 weeks." },
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
      minutes: 3,
      navLabel: "Project A · Immigration platform",
      eyebrow: "Current project",
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
      minutes: 2,
      navLabel: "Project B · 240M records",
      eyebrow: "Highlight project",
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
      minutes: 1.5,
      navLabel: "Project C · Internal chat",
      eyebrow: "Highlight project",
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


    // ---------------------------------------------------------- Project D (optional)
    {
      id: "project-d",
      type: "project",
      minutes: 1.5,
      navLabel: "Project D · Zero-downtime deploys",
      eyebrow: "Highlight project",
      period: "2020 – 2022",
      role: "MaideaX · backend / deployment",
      title: "Zero-downtime Docker deployments",
      tagline: "Turned manual, downtime-required releases of a third-party payment site into a one-command, zero-downtime update with auto-renewing SSL.",
      pickerNote: "Docker, CI/CD mindset, operations; good for DevOps-minded companies",
      tech: ["Docker", "docker-compose", "Nginx", "certbot", "Shell", "EC2"],
      problem: [
        "Every release of the payment site required downtime and many manual, error-prone steps.",
        "SSL renewal depended on someone remembering; expiry was a real risk.",
        "No CI tooling, so the deployment process could not be verified ahead of time.",
      ],
      solution: [
        { label: "Containerize:", text: "packaged the service, Nginx and config with docker-compose for consistent versions and environments." },
        { label: "One-command update:", text: "a script on the deploy host runs the pipeline: pull the new image → start a new container → health check → switch traffic → remove the old one." },
        { label: "Auto-renew certificates:", text: "a certbot cron job renews and reloads Nginx." },
        { label: "Rehearse first:", text: "simulated the whole pipeline in a Docker-based Linux sandbox before touching production." },
      ],
      stat: { num: "0", label: "seconds of downtime per release" },
      result: [
        "Production updates no longer interrupt service; deployment became a single command.",
        "Built an internal sandbox environment for partners to test integrations.",
        "Delivered the spirit of CI/CD without CI tooling: repeatable, verifiable, reversible.",
      ],
      flow: [
        { label: "git push" },
        { label: "build image" },
        { label: "pull on host", sub: "one command", hl: true },
        { label: "new container", sub: "health check" },
        { label: "switch traffic", sub: "Nginx", hl: true },
        { label: "remove old" },
      ],
    },

    // ---------------------------------------------------------- Project E (optional)
    {
      id: "project-e",
      type: "project",
      minutes: 1.5,
      navLabel: "Project E · AI support classifier",
      eyebrow: "Highlight project",
      period: "2024",
      role: "Academic document platform · backend",
      title: "AI customer-inquiry classifier",
      tagline: "Used the OpenAI API to classify support conversations and summarize the key points, so hand-offs between agents no longer required re-reading the whole thread.",
      pickerNote: "LLM application, prompt design, cost trade-offs; good for AI-related roles",
      tech: ["Python", "OpenAI API", "Prompt Design", "JSON Output", "Chrome Extension"],
      problem: [
        "Support conversations changed hands; the next agent struggled to follow earlier context, and response time grew.",
        "Many inquiry types made manual routing to the right team error-prone.",
      ],
      solution: [
        { label: "Capture:", text: "a Chrome extension pulls the conversation from the support system." },
        { label: "Prompt design:", text: "the model must answer in a fixed JSON shape: category, key sentences, suggested route, so code can parse it." },
        { label: "Validate & route:", text: "schema-validate the result, then route to the matching support team." },
        { label: "Cost control:", text: "after measuring cost, rolled it out to new agents only, where it adds the most value." },
      ],
      stat: { num: "83%", label: "routing accuracy" },
      result: [
        "Support handling time **down 57%**; new agents could take over quickly.",
        "Lesson for shipping LLMs: structured output, a validation layer, and honesty about API cost.",
      ],
      flow: [
        { label: "Conversation" },
        { label: "Chrome extension" },
        { label: "OpenAI API", sub: "JSON prompt", hl: true },
        { label: "Validate", sub: "schema" },
        { label: "Route to team", hl: true },
      ],
    },

    // ---------------------------------------------------------- Project F (optional)
    {
      id: "project-f",
      type: "project",
      minutes: 1.5,
      navLabel: "Project F · Automated data sync",
      eyebrow: "Highlight project",
      period: "2024",
      role: "Academic document platform · backend",
      title: "Automated OpenAlex data sync",
      tagline: "Replaced a quarterly manual refresh with a daily pipeline that checks, downloads, parses and reports on its own.",
      pickerNote: "Scheduling, automation, data pipelines; good for data-heavy products",
      tech: ["Python", "AWS Lambda", "EventBridge", "S3", "MySQL"],
      problem: [
        "OpenAlex data was re-synced by hand every quarter: slow and easy to miss updates.",
        "Large volumes caused timeouts, and failures went unnoticed.",
      ],
      solution: [
        { label: "Follow the official manifest:", text: "an EventBridge schedule runs daily and diffs the manifest to find updated files." },
        { label: "Process per file:", text: "download, parse and load one file at a time; failed files are logged and retried." },
        { label: "Observable:", text: "every run emits logs and a summary notification, so anomalies surface immediately." },
      ],
      stat: { num: "-89%", label: "manual sync effort" },
      result: [
        "Data went from \"once a quarter\" to \"fresh every day\" with nobody watching it.",
        "Complements the 240M-record import: bulk load first, then continuous incremental sync.",
      ],
      flow: [
        { label: "EventBridge", sub: "daily" },
        { label: "manifest diff", sub: "S3 polling", hl: true },
        { label: "download / parse" },
        { label: "MySQL" },
        { label: "log + notify", hl: true },
      ],
    },

    // ---------------------------------------------------------- Project G (optional)
    {
      id: "project-g",
      type: "project",
      minutes: 1.5,
      navLabel: "Project G · Plagiarism detection",
      eyebrow: "Highlight project",
      period: "2024",
      role: "Academic document platform · backend",
      title: "Document plagiarism detection",
      tagline: "Designed matching logic that tolerates light rewording and marks the exact copied spans, to stop contract writers from plagiarizing.",
      pickerNote: "Algorithms and data structures in practice; good for algorithm-heavy interviews",
      tech: ["Python", "Sliding Window", "Interval Merge", "Counter"],
      problem: [
        "The client needed to detect whether contract writers copied existing documents, but copies were lightly reworded, so exact matching missed them.",
        "Copied spans had to be highlighted on the original text, yet tokenized word indexes drifted from character positions.",
        "A minimum-steps (edit distance) approach was too slow and didn't match the requirement.",
      ],
      solution: [
        { label: "Sliding window + Counter:", text: "compare word frequencies per window and allow a tolerance ratio, catching \"a few words changed\" copies." },
        { label: "Interval merge:", text: "turn matching windows into intervals and merge overlaps for clean highlighted ranges." },
        { label: "Offset correction:", text: "track special-character counts in a list to map word indexes back to character positions." },
      ],
      result: [
        "Results matched the client's expectations and raised trust in the writers' output.",
        "Lesson: translating the requirement into the right data structure matters more than applying a textbook algorithm.",
      ],
      flow: [
        { label: "Source / candidate" },
        { label: "tokenize", sub: "track offsets" },
        { label: "Sliding window", sub: "Counter tolerance", hl: true },
        { label: "Interval merge", hl: true },
        { label: "highlight output" },
      ],
    },

    // ---------------------------------------------------------- Project H (optional)
    {
      id: "project-h",
      type: "project",
      minutes: 1.5,
      navLabel: "Project H · Monitoring & logging",
      eyebrow: "Highlight project",
      period: "2024 – 2025",
      role: "Pacston · backend",
      title: "Monitoring, logging and alerting",
      tagline: "Moved logs out of the database and off the servers, so nobody needs SSH to look, and problems announce themselves.",
      pickerNote: "Observability and operational maturity; good for reliability-focused teams",
      tech: ["FastAPI Middleware", "AWS CloudWatch", "GoAccess", "Nginx", "EventBridge", "Telegram Bot"],
      problem: [
        "Access logs lived in MySQL and slowed the main database; reading logs meant SSH-ing into machines.",
        "Traffic anomalies and errors were noticed by customers before engineers.",
      ],
      solution: [
        { label: "Centralize:", text: "a FastAPI middleware ships each request's context to CloudWatch; the database no longer stores logs." },
        { label: "Visualize:", text: "GoAccess renders Nginx logs into periodic reports, so traffic trends are obvious at a glance." },
        { label: "Alert:", text: "EventBridge counts requests hourly and alerts on anomalies; a Telegram bot pushes stack traces for errors in real time." },
        { label: "Rescue stuck jobs:", text: "a sweeper resets records stuck in Processing so workers pick them up again." },
      ],
      stat: { num: "-77%", label: "manual log inspection" },
      result: [
        "Problems are caught before customers report them; a bad deploy can be rolled back immediately.",
        "Now pushing for a correlation ID so one document's whole lifecycle can be traced with a single query.",
      ],
      flow: [
        { label: "Request" },
        { label: "Middleware", sub: "FastAPI", hl: true },
        { label: "CloudWatch", sub: "central logs" },
        { label: "GoAccess", sub: "Nginx reports" },
        { label: "EventBridge", sub: "hourly counts" },
        { label: "Telegram alert", hl: true },
      ],
    },

    // ---------------------------------------------------------- 6. Closing
    {
      id: "closing",
      type: "closing",
      navLabel: "Closing",
      eyebrow: "Wrap-up",
      title: "Thank you. Happy to take questions.",
      contact: ["chuyu.hsiao.tw@gmail.com", "Luke Hsiao · 蕭祖佑"],
    },
  ],
};
