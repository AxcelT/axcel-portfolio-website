/**
 * DATA CONFIGURATION
 * Stores all static content for the portfolio views (Home, Work, Education, Projects, Now).
 * Separates content from logic to allow easy text updates.
 * Each key corresponds to a valid route hash.
 */
const PORTFOLIO_DATA = {
    home: {
        title: "Axcel Justin D. Tidalgo",
        subtitle: "Associate Technical Engineer @Finastra",
        intro: `Hi, I’m <span class="highlight">Axcel</span>. I’m an Associate Technical Engineer at Finastra, working on the Equation core banking system. <span class="highlight">I like chocolate-chip cookies.</span>`,
        links: [
            { label: "select_projects()", route: "projects" },
            { label: "work_history()", route: "work" },
            { label: "education_&_certifications()", route: "education" },
            { label: "current_state()", route: "now" }
        ],
        contact: {
            email: "tidalgo.ajd@gmail.com",
            location: "Quezon City, NCR, Philippines",
            socials: [
                { label: "GitHub", url: "https://github.com/AxcelT" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/axcel-justin-tidalgo-1a3940217/" },
                { label: "CV", url: "AXCEL_TIDALGO_CV_JAN2026.pdf" }
            ]
        }
    },
    work: {
        title: "Work History",
        subtitle: "A brief record of where I have been and what I have worked on.",
        timeline: [
            {
                date: "Jul 2025",
                endDate: "Present",
                title: "FinStarter – Associate Technical Engineer",
                meta: "Finastra · Full-time · Pasig, NCR (Hybrid)",
                points: [
                    "Work with <span class='highlight'>core banking frameworks</span> across deposits, lending, loan servicing, and account lifecycle within FusionBanking Equation.",
                    "Replicate and investigate over <span class='highlight'>15+ client issues</span> by analyzing IBM i, RPGLE, CLLE, and SQL-driven system logic.",
                    "Trace defects across Equation’s legacy codebase and validate fixes across product versions."
                ]
            },
            {
                type: "note",
                text: "Focused on final phase of thesis development."
            },
            {
                date: "May 2024",
                endDate: "Sep 2024",
                title: "Information Technology Intern",
                meta: "Dynamic Business Outsourcing Solutions (DBOS) · Internship · Quezon City (On-site)",
                points: [
                    "Managed and processed <span class='highlight'>1,000+ IT assets</span> for accurate inventory and compliance.",
                    "Helped set up and maintain a local network project for the office.",
                    "Provided on-site IT support, resolving <span class='highlight'>30+ issues</span> regarding hardware, software, and connectivity."
                ]
            },
            {
                type: "note",
                text: "Focused on final year academic coursework and thesis development."
            },
            {
                date: "Dec 2022",
                endDate: "Dec 2023",
                title: "NFT & Web Integration Developer",
                meta: "Freelance · Remote",
                points: [
                    "Developed <span class='highlight'>10+ automated VM environments</span> for blockchain token generation and deployment.",
                    "Integrated <span class='highlight'>20+ smart contracts</span> into web interfaces, enabling secure digital asset transactions."
                ]
            }
        ]
    },
    education: {
        title: "Education & Certifications",
        subtitle: "My academic background and professional credentials.",
        timeline: [
            {
                date: "Graduated",
                endDate: "Jun 2025",
                title: "Bachelor of Science in Computer Engineering",
                meta: "De La Salle University · Manila, NCR",
                points: [
                    "<span class='highlight'>Focused coursework:</span> Neural Networks, Machine Learning, Artificial Intelligence.",
                    "<span class='highlight'>Thesis:</span> Developed a wearable visual aid integrating a custom object detection model and Luxonis DepthAI for 3D spatial inference.",
                    "<span class='highlight'>Capstone Project:</span> Created an embedded vision system for real-time situational awareness."
                ]
            }
        ]
    },
    projects: {
        title: "Selected Projects",
        subtitle: "A concise archive of things I’ve built or contributed to.",
        timeline: [
            {
                date: "Apr 2025",
                title: "AI Thesis: Visual Aid Device",
                meta: "Academic Thesis · <span class='highlight'>Python</span> · <span class='highlight'>DepthAI</span> · <span class='highlight'>Computer Vision</span>",
                points: [
                    "Designed dataset pipeline and preprocessing workflows.",
                    "Built computer-vision logic to detect obstacles and spatial cues.",
                    "Integrated haptic-feedback translation for assisted navigation."
                ],
                footer: `Collaborators: <a href="https://www.linkedin.com/in/ellise-pag-ong-75aa78250/" target="_blank" class="timeline-link">Ellise Pag-ong</a>, <a href="https://www.linkedin.com/in/cian-marlo-santos/" target="_blank" class="timeline-link">Cian Marlo Santos</a>`,
                link: { url: "https://github.com/ellisepagong/DSP-1-2324-C7-ObstacleDetection", label: "[Repo Link]" }
            }
        ]
    },
    now: {
        title: "Now",
        subtitle: "What I am focusing on at this point in my life.",
        items: [
            "<span class='highlight'>Learning</span> to fit into my role at Finastra more effectively.",
            "<span class='highlight'>Becoming</span> a better partner to my girlfriend and her family.",
            "<span class='highlight'>Staying</span> productive each day, even in small ways.",
            "<span class='highlight'>Building</span> the foundation of my investment portfolio.",
            "<span class='highlight'>Spending</span> more time with my family."
        ],
        lastUpdated: "December 02, 2025"
    }
};

/**
 * INITIALIZATION & ROUTING
 * Manages the application lifecycle and navigation.
 * Detects URL hash changes to switch views (Home, Work, etc.).
 * Clears the container and scrolls to top on every route change.
 */
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    handleRoute();
    window.addEventListener("hashchange", handleRoute);
});

function handleRoute() {
    const hash = window.location.hash.replace("#", "") || "home";
    const app = document.getElementById("app");

    app.innerHTML = "";
    
    switch (hash) {
        case "work":
            renderTimelinePage(app, "work");
            break;
        case "education":
            renderTimelinePage(app, "education");
            break;
        case "projects":
            renderTimelinePage(app, "projects");
            break;
        case "now":
            renderNowPage(app);
            break;
        case "home":
        default:
            renderHomePage(app);
            break;
    }
    
    window.scrollTo(0, 0);
}

/**
 * UTILITY: DURATION HELPER
 * Calculates the time difference between a start date and an end date.
 * Handles 'Present' as the current date.
 * Adjusts year/month calculation to account for negative month differences.
 * Returns a formatted string (e.g., '1 yr 2 mos') for the timeline display.
 */
function getDuration(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = endDateStr === "Present" ? new Date() : new Date(endDateStr);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const yLabel = years === 1 ? "yr" : "yrs";
    const mLabel = months === 1 ? "mo" : "mos";

    let duration = "";
    if (years > 0) duration += `${years} ${yLabel} `;
    if (months > 0 || years === 0) duration += `${months} ${mLabel}`;

    return duration.trim();
}

/**
 * VIEW RENDERERS
 * Constructs HTML for specific pages using the data object.
 * renderHomePage: Builds the landing page with navigation links.
 * renderTimelinePage: Builds Work/Education/Project lists and injects duration string if applicable.
 * renderNowPage: Builds the 'Now' page with a list of current focuses.
 */
function renderHomePage(container) {
    const data = PORTFOLIO_DATA.home;
    
    const navLinksHTML = data.links.map(link => `
        <a href="#${link.route}" class="nav-item">
            <span class="nav-arrow">&gt;</span>
            <span class="nav-label">${link.label}</span>
        </a>
    `).join("");

    const socialLinksHTML = data.contact.socials.map(social => `
          <a href="${social.url}" target="_blank" rel="noreferrer">
              ${social.label}
          </a>
    `).join("");

    const html = `
        <header class="page-header">
            <h1 class="page-title">${data.title}</h1>
            <p class="page-subtitle">${data.subtitle}</p>
        </header>

        <section class="page-section">
            <p>${data.intro}</p>
        </section>

        <section class="page-section page-nav">
            <p>...</p>
            <nav>${navLinksHTML}</nav>
        </section>

        <section class="page-section page-contact">
            <p>...</p>
            <div class="contact-row">
                <span class="contact-label">Email</span>
                <a href="mailto:${data.contact.email}" class="contact-link">${data.contact.email}</a>
            </div>
            <div class="contact-row">
                <span class="contact-label">Location</span>
                <span class="contact-text">${data.contact.location}</span>
            </div>
            <div class="contact-row">
                <span class="contact-label">Links</span>
                <div class="contact-links">${socialLinksHTML}</div>
            </div>
        </section>
    `;
    
    container.innerHTML = html;
}

function renderTimelinePage(container, key) {
    const data = PORTFOLIO_DATA[key];
    const timelineHTML = data.timeline.map(item => {
        if (item.type === "note") {
            return `
                <article class="timeline-item timeline-note">
                    <div class="timeline-date">
                        <span>Time-in-Between</span>
                    </div>
                    <p class="timeline-note-text">${item.text}</p>
                </article>
            `;
        }

        let durationHTML = "";
        if (item.endDate && key !== "education") {
            const duration = getDuration(item.date, item.endDate);
            if (duration) {
                durationHTML = `<span class="date-duration">(${duration})</span>`;
            }
        }

        let divider = "to";
        if (key === "education" && item.date === "Graduated") {
            divider = "in";
        }

        const dateHTML = item.endDate 
            ? `<span>${item.date}</span><span class="date-divider">${divider}</span><span>${item.endDate}</span><br/>${durationHTML}`
            : `<span>${item.date}</span>`;

        const pointsHTML = item.points 
            ? `<ul class="timeline-points">${item.points.map(pt => `<li>${pt}</li>`).join("")}</ul>` 
            : "";

        const footerHTML = item.footer 
            ? `<div class="timeline-footer">${item.footer}</div>` 
            : "";
            
        const linkHTML = item.link 
            ? `<a href="${item.link.url}" target="_blank" class="timeline-link">${item.link.label}</a>` 
            : "";

        return `
            <article class="timeline-item">
                <div class="timeline-date">${dateHTML}</div>
                <h2 class="timeline-title">${item.title}</h2>
                <p class="timeline-meta">${item.meta}</p>
                ${pointsHTML}
                ${footerHTML}
                ${linkHTML}
            </article>
        `;
    }).join("");

    const lastUpdated = "January 04th, 2026"; 
    const html = `
        <header class="page-header">
            <h1 class="page-title">${data.title}</h1>
            <p class="page-subtitle">${data.subtitle}</p>
        </header>

        <section class="page-section subtle-section">
            <div class="timeline">
                ${timelineHTML}
            </div>
        </section>
        
        <p class="last-updated">last updated:<br />${lastUpdated}</p>
        
        <section class="page-section page-nav">
            <nav>
                <a href="#home" class="nav-item">
                    <span class="nav-arrow">&gt;</span>
                    <span class="nav-label">back_to_index()</span>
                </a>
            </nav>
        </section>
    `;

    container.innerHTML = html;
}

function renderNowPage(container) {
    const data = PORTFOLIO_DATA.now;
    
    const listHTML = data.items.map(item => `<li>${item}</li>`).join("");

    const html = `
        <header class="page-header">
            <h1 class="page-title">${data.title}</h1>
            <p class="page-subtitle">${data.subtitle}</p>
        </header>

        <section class="page-section subtle-section">
            <ul class="now-list">
                ${listHTML}
            </ul>

            <p class="last-updated">
                last updated:<br />
                ${data.lastUpdated}
            </p>
        </section>

        <section class="page-section page-nav">
            <nav>
                <a href="#home" class="nav-item">
                    <span class="nav-arrow">&gt;</span>
                    <span class="nav-label">back_to_index()</span>
                </a>
            </nav>
        </section>
    `;

    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    
    const introOverlay = document.getElementById("intro-overlay");
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.remove();
        }, 2500);
    }

    handleRoute();
    window.addEventListener("hashchange", handleRoute);
});