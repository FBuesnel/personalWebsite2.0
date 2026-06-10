import fs from 'fs';
import path from 'path';
import { PrismaClient, ExperienceSection } from '@prisma/client';

const prisma = new PrismaClient();

// One-time port of the previously hardcoded site content into the database.
// Safe to re-run: it skips any table that already has rows.

const experience = [
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/mirrortab.png',
    title: 'Software Engineer Intern',
    subtitle: 'MirrorTab (Jun 2026 - Present)',
    bullets: [
      'Joined MirrorTab for summer 2026 to help build Haven, an AI-powered browser safety layer that helps people verify links and avoid fake sites.',
      'Working on the engineering team building technology that keeps users safer online.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/thenudge.png',
    title: 'Software Engineer Contractor',
    subtitle: 'The Nudge (Aug 2025 - Jun 2026)',
    bullets: [
      'Architected automated user engagement workflows for 50,000+ users using Scala, supporting platform retention goals.',
      'Shipped a creator video upload flow for 500+ users and redesigned a content display component through two rounds of designer and user feedback.',
      'Led the Expo SDK 53 to 54 upgrade with full end-to-end QA across all React Native features.',
      'Migrated in-app purchase validation from Apple StoreKit V1 to V2, updating receipt verification endpoints critical to revenue infrastructure.',
      'Transitioned weather data from OpenWeatherMap to Apple WeatherKit, improving accuracy for iOS users and reducing third-party API costs.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/bostonuniversity.png',
    title: 'Course Assistant for CS501',
    subtitle: 'Boston University (Aug - Dec 2025)',
    bullets: [
      'Provided mentorship and grading support for a graduate-level course on server application development.',
      'Created and refined grading rubrics to ensure fairness and consistency across assignments.',
      'Advised students on technologies for their final projects based on my experience in software engineering roles.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/ktp.png',
    title: 'Vice President of Finance',
    subtitle: 'Kappa Theta Pi, Lambda Chapter (Dec 2024 - Dec 2025)',
    bullets: [
      'Managed an $11,000 budget for my professional fraternity, allocating funds and hosting fundraisers.',
      'Collected membership dues from 60+ members.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/equityhealth.png',
    title: 'Data Analyst Intern',
    subtitle: 'Equity Health (Aug 2025)',
    bullets: [
      'Published multiple text campaigns to 500+ patients, increasing cancer screening rates.',
      'Tracked attendance data to measure the impact of initiatives like text campaigns and follow-up calls.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/thenudge.png',
    title: 'Software Engineer Intern',
    subtitle: 'The Nudge (Jun - Aug 2025)',
    bullets: [
      'Built and shipped a mobile ticketing commerce feature accessible to 2.5M+ users, processing $15k+ in gross transaction volume.',
      'Optimized OpenAI batch API costs by 50%, saving results directly to Google Sheets via automation.',
      'Overhauled an internal tool used by 30+ e-commerce partners.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/bostonuniversity.png',
    title: 'Course Assistant for CS132',
    subtitle: 'Boston University (Aug 2024 - May 2025)',
    bullets: [
      'Lead weekly office hours to help 300+ students solidify linear algebra concepts.',
      'Direct students on how to implement linear algebra concepts using Python.',
      'Grade over 200 assignments per week by creating a rubric and assigning points.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/ktp.png',
    title: 'Vice President of Engagement',
    subtitle: 'Kappa Theta Pi, Lambda Chapter (Aug - Dec 2024)',
    bullets: [
      'Planned two events per month for the 80+ members of my professional fraternity.',
      'Managed a budget of $4,000+ during the semester.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/beehiveai.jpeg',
    title: 'Full-Stack Development Intern',
    subtitle: 'Beehive AI (May - Aug 2024)',
    bullets: [
      'Developed a new file upload front-end in Typescript to streamline the experience for over 500 users.',
      'Fixed over 30 bugs throughout their web app locating their source and pushing fixes to development.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/joejuice.png',
    title: 'Juicer',
    subtitle: 'Joe & The Juice (May - Aug 2023)',
    bullets: [
      'Handled hundreds of customer orders every day, making juices, sandwiches, and shakes while creating a good atmosphere in the store.',
      'Balanced work responsibilities and pursued my passion for programming during the summer.',
      'Transitioned from a previous technology job to the fast-paced environment of Joe and the Juice, demonstrating adaptability in learning new skills.',
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/conventlogo.png',
    title: 'Technology Assistant',
    subtitle: 'Convent & Stuart Hall (Aug. 2022 - May 2023)',
    bullets: [
      'Facilitated faculty device transfers by moving their data and preparing their new computers.',
      'Set up new devices across campus like TVs in every classroom.',
      "Organized an e-recycling program for the school's students and administration.",
    ],
  },
  {
    section: ExperienceSection.EXPERIENCE,
    imageUrl: '/images/experience/conventlogo.png',
    title: 'Technology Intern',
    subtitle: 'Convent & Stuart Hall (May - Aug 2021)',
    bullets: [
      'Facilitated faculty device transfers by moving their data and preparing their new computers.',
      'Set up new devices across campus like TVs in every classroom.',
      "Organized an e-recycling program for the school's students and administration.",
    ],
  },
  {
    section: ExperienceSection.EDUCATION,
    imageUrl: '/images/experience/bostonuniversity.png',
    title: 'Boston University',
    subtitle: '2023-2027',
    bullets: [
      "Grade: GPA 3.93/4.00, Dean's List (All Semesters)",
      "Degrees: Bachelor's of Arts in Computer Science, Bachelor's of Arts in Economics",
      'Activities and Societies: KTP (Kappa Theta Pi Lambda Chapter), ΣΧ (Sigma Chi Iota Upsilon Chapter), Fashion Club, Student Food Rescue, Boston Hacks, Intramural Volleyball',
      'Classes: CS131 Combinatoric Structures, CS132 Geometric Algorithms, CS330 Analysis of Algorithms, CS460 Introduction to Database Systems, CS411 Software Engineering, CS392 .NET and C# Programming',
    ],
  },
  {
    section: ExperienceSection.EDUCATION,
    imageUrl: '/images/experience/conventlogo.png',
    title: 'Convent & Stuart Hall High School',
    subtitle: '2019-2023',
    bullets: [
      'Grades/Scores: 4.0/4.70 UW/W GPA, 35 ACT',
      'Degree: International Baccalaureate Diploma, High School Diploma',
      'Awards: Valedictorian, Faculty Designated Awards (Math, History, Modern & Classical Languages, English), 4-Year Prizes (Math, English)',
      'Activities and Societies: Varsity Volleyball, Co-Founder Garden Club, Founder Social Justice Literary Club, Software Engineer for IB-Keyword-Search, Poetry Festival Panelist, Study Abroad Programs (Berlin, Copenhagen, and Rome)',
    ],
  },
];

const portfolio = [
  {
    imageUrl: '/images/portfolio/lumina.jpg',
    title: 'LUMINA',
    subtitle: 'Wellness Booking Platform',
    description:
      'A production booking platform for LUMINA, a red light therapy and wellness studio in Reno, NV. Members purchase session packs and subscriptions through Stripe and book appointments online, while staff manage scheduling, check-ins, and automated emails from a full admin dashboard. Built with Next.js, TypeScript, and PostgreSQL.',
    websiteUrl: 'https://lumina-reno.com',
  },
  {
    imageUrl: '/images/portfolio/dormdash.png',
    title: 'DormDash',
    subtitle: 'Cross-Platform Delivery App',
    description:
      'A cross-platform food delivery app built with a four-person team. Features a React Native frontend, a C# ASP.NET Core backend with a Supabase SQL database, and Stripe integration for secure payments and payouts.',
    githubUrl: 'https://github.com/FBuesnel/DormDash-CS392',
  },
  {
    imageUrl: '/images/portfolio/SFWBookclub.jpg',
    title: 'SFW Bookclub',
    subtitle: "Saint Francis Wood's Bookclub",
    description:
      "Created with the Google Books API and Flask, this webapp allows my community's bookclub to schedule meetings online and record their history. It has both a regular view and an admin login to edit information directly from the website.",
    githubUrl: 'https://github.com/FBuesnel/SaintFrancisBookClub',
  },
  {
    imageUrl: '/images/portfolio/personalWebsite2.png',
    title: 'Personal Website 2.0',
    subtitle: 'Personal Website 2.0',
    description:
      "Created using React, Typescript, and Styled Components. It's a complete redesign of my original website, with a focus on improving the user experience, overall aesthetic, and longevity.",
    githubUrl: 'https://github.com/FBuesnel/personalWebsite2.0',
    websiteUrl: 'https://fynnbuesnel.me',
  },
  {
    imageUrl: '/images/portfolio/3DGraphing.jpg',
    title: '3D Graphic Experiments',
    subtitle: '3D Graphing Experiment',
    description:
      'Python app employing Matplotlib and Numpy arrays to illustrate different matrices transformations. Allows a user to visualize the effects of rotation and translation on different 3D shapes.',
    githubUrl: 'https://github.com/FBuesnel/3D-Graphing-Experiments',
  },
  {
    imageUrl: '/images/portfolio/personalWebsite1.png',
    title: 'Personal Website 1.0',
    subtitle: 'Personal Website 1.0',
    description:
      'Created using Flask, Jinja, and Python. This first attempt provided a great learning experience on how to host a website and the basics of web development.',
    githubUrl: 'https://github.com/FBuesnel/PersonalWebsite1.0',
    websiteUrl: 'https://personalwebsite-5y5w.onrender.com/',
  },
  {
    imageUrl: '/images/portfolio/wordSearcher.jpg',
    title: 'Word Context Searcher',
    subtitle: 'Word In Context Searcher',
    description:
      'Utilizing a custom-designed web scraper for word information. This allows a user to research a word in context, play a game to practice memorization and save it in a .txt file.',
    githubUrl: 'https://github.com/FBuesnel/wordSearcher',
  },
  {
    imageUrl: '/images/portfolio/IB-Keyword-Search.jpg',
    title: 'IB-Keyword-Search',
    subtitle: 'IB-Keyword-Search',
    description:
      'Created in conjunction with other programmers from my High School. It allows a teacher to easily locate past test papers for use in class. Utilizes a PDF scanner and merge sort.',
    githubUrl: 'https://github.com/thienchaulol/IB-Keyword-Search',
  },
];

const posts = [
  {
    slug: 'moving-into-eternity',
    title: 'Moving Into Eternity',
    quote: 'Yet as Akshan sat slowly onto the bench, his little life became whole, and he felt the eternity of the world.',
    file: 'post1.md',
  },
  {
    slug: 'explanation-poem',
    title: 'Explanation',
    quote: 'My life is ever-expanding chasing her',
    file: 'post2.md',
  },
  {
    slug: 'maile-birthday-2025',
    title: 'Radiance',
    quote: 'I thought: here, everything is.',
    file: 'post3.md',
  },
  {
    slug: 'places-to-return-to',
    title: 'Places I want to go back to, before I die',
    quote: 'I’d like a bench named “Fynn"',
    file: 'post4.md',
  },
];

async function main() {
  if ((await prisma.experienceEntry.count()) === 0) {
    await prisma.experienceEntry.createMany({
      data: experience.map((entry, i) => ({ ...entry, sortOrder: i })),
    });
    console.log(`Seeded ${experience.length} experience entries`);
  } else {
    console.log('ExperienceEntry table not empty, skipping');
  }

  if ((await prisma.portfolioProject.count()) === 0) {
    await prisma.portfolioProject.createMany({
      data: portfolio.map((project, i) => ({ ...project, sortOrder: i })),
    });
    console.log(`Seeded ${portfolio.length} portfolio projects`);
  } else {
    console.log('PortfolioProject table not empty, skipping');
  }

  if ((await prisma.post.count()) === 0) {
    for (const [i, post] of posts.entries()) {
      const content = fs.readFileSync(
        path.join(process.cwd(), 'content', 'posts', post.file),
        'utf8'
      );
      await prisma.post.create({
        data: {
          slug: post.slug,
          title: post.title,
          quote: post.quote,
          content,
          // Preserve listing order (oldest first, matching the old registry)
          createdAt: new Date(Date.UTC(2025, 0, 1 + i)),
        },
      });
    }
    console.log(`Seeded ${posts.length} posts`);
  } else {
    console.log('Post table not empty, skipping');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
