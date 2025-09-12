// projects.js
const projects = [
  {
    title: "Echoforms",
    image: "../assets/img1.webp",
    description:
      "EchoForms is an AI-powered SaaS for effortless form creation via prompts. It offers real-time analytics, email notifications, and seamless data export, making form management efficient and user-friendly.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Drizzle ORM",
      "PostgreSQL",
      "NeonDB",
      "Gemini LLM",
      "Clerk",
      "Zod",
      "Docker"
    ],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "ReportNow",
    image: "../assets/img2.webp",
    description:
      "A secure platform for anonymous incident reporting, leveraging AI and real-time location tracking to enhance accuracy and efficiency.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "NextAuth",
      "Prisma",
      "PostgreSQL",
      "NeonDB",
      "Gemini LLM",
      "Here API",
      "Docker"
    ],
    liveUrl: "#",
    githubUrl: "#"
  }

  // Add new projects by appending another object here
];

function renderProjects() {
  const container = document.querySelector(".projects");
  if (!container) return;

  container.innerHTML = projects
    .map(project => {
      const techHtml = (project.tech || []).map(t => `<span>${t}</span>`).join("");
      const liveLink = project.liveUrl
        ? `<a href="${project.liveUrl}" target="_blank" rel="noreferrer">Live</a>`
        : "";
      const githubLink = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>`
        : "";

      return `
      <div class="project-card">
        <img src="${project.image}" alt="${project.title} preview">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-stack">
            ${techHtml}
          </div>
          <div class="project-links">
            ${liveLink}
            ${githubLink}
          </div>
        </div>
      </div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderProjects);


