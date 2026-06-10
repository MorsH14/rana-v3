import { COLORS } from "@/utils/colors.util";
import { SmileyAngry } from "@phosphor-icons/react";
import { Smiley, SmileySad } from "@phosphor-icons/react/dist/ssr";

export const jobProfiles = [
  {
    title: "Lesson Teacher",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    skills: ["Mathematics", "English Language", "Computer Science", "Computer Science"]
  },
  {
    title: "Lesson Teacher",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    skills: ["Mathematics", "English Language", "Computer Science", "Computer Science"]
  },
  {
    title: "Lesson Teacher",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    skills: ["Mathematics", "English Language", "Computer Science", "Computer Science"]
  },

];



export const reactionsData = [
  { emoji: <Smiley size={30} weight="fill" color={COLORS.yellow100} />, count: 8 },
  { emoji: <SmileySad size={30} color={COLORS.yellow100} weight="fill" />, count: 1 },
  { emoji: <SmileyAngry size={30} weight="fill" color={COLORS.yellow100} />, count: 1 }
];

export const reviewsData = [
  {
    author: 'Alade Olamide',
    comment: 'I am truly satisfied with the service provided by this company. I would recommend them to others.',
    imgSrc: './assets/x.png'
  },
  {
    author: 'John Doe',
    comment: 'A very professional team. I found my dream job within a week of using Rana. Highly recommended!',
    imgSrc: './assets/li.png'
  },
  {
    author: 'Jane Smith',
    comment: 'The experience was excellent. The platform is easy to use and the job listings are very relevant.',
    imgSrc: './assets/xx.png'
  }
];

export const jobData = [
  {
    id: 1,
    company: "Chidi Okafor",
    role: "Lesson Teacher (Maths & English)",
    date: "2nd June 2025",
    salary: "₦15,000/month",
    salaryValue: 15000,
    location: "Lagos",
    logo: "/assets/images/logo.jpeg",
    category: "education",
    description: "Experienced lesson teacher available for primary 3–6 pupils. I cover Mathematics, English Language, and Basic Science. I can visit your home in Lagos or teach online via Zoom. Very flexible schedule including weekends and public holidays.",
    chips: ["Education", "Home Visit", "Online"],
    rating: 4.8,
    reviewCount: 47,
  },
  {
    id: 2,
    company: "Fatima Bello Designs",
    role: "Professional Tailor & Fashion Designer",
    date: "5th June 2025",
    salary: "₦8,000/outfit",
    salaryValue: 8000,
    location: "Abuja",
    logo: "/assets/images/logo.jpeg",
    category: "fashion",
    description: "Skilled tailor with 8 years of experience in ladies' wear, men's native attire, and alterations. Specialising in Ankara, lace, and corporate styles. I deliver within 5–7 working days with quality finish guaranteed. Free minor alterations within 2 weeks.",
    chips: ["Fashion", "On-site", "Ankara"],
    rating: 4.9,
    reviewCount: 132,
  },
  {
    id: 3,
    company: "DevHub Nigeria",
    role: "Full Stack Web Developer",
    date: "1st June 2025",
    salary: "₦200,000/project",
    salaryValue: 200000,
    location: "Lagos",
    logo: "/assets/images/logo.jpeg",
    category: "tech",
    description: "We build fast, responsive websites and web applications for Nigerian businesses. Services include landing pages, e-commerce stores, dashboards, and custom software. Technologies: React, Next.js, Node.js, and PostgreSQL. Portfolio available on request.",
    chips: ["Tech", "Remote", "Web Dev"],
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: 4,
    company: "Mama Tee Catering",
    role: "Caterer & Event Chef",
    date: "4th June 2025",
    salary: "₦50,000/event",
    salaryValue: 50000,
    location: "Port Harcourt",
    logo: "/assets/images/logo.jpeg",
    category: "food-events",
    description: "Professional catering service for weddings, birthdays, corporate events, and family gatherings. We handle everything from menu planning to serving staff. Specialties include Jollof rice, small chops, pepper soup, and all Nigerian cuisines. Minimum 20 guests.",
    chips: ["Food & Events", "On-site", "All Cuisines"],
    rating: 4.9,
    reviewCount: 218,
  },
  {
    id: 5,
    company: "CleanPro Services",
    role: "Professional Home Cleaner",
    date: "3rd June 2025",
    salary: "₦5,000/session",
    salaryValue: 5000,
    location: "Lagos",
    logo: "/assets/images/logo.jpeg",
    category: "home-services",
    description: "Thorough, reliable home cleaning for apartments and houses in Lagos. Services include deep cleaning, regular maintenance cleaning, post-renovation cleanup, and move-in/move-out cleaning. All cleaning supplies provided. Background-checked staff.",
    chips: ["Home Services", "On-site", "Deep Clean"],
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 6,
    company: "Rapid Dispatch Lagos",
    role: "Dispatch Rider / Delivery",
    date: "6th June 2025",
    salary: "₦3,000/day",
    salaryValue: 3000,
    location: "Lagos",
    logo: "/assets/images/logo.jpeg",
    category: "transport",
    description: "Fast and reliable dispatch and delivery service within Lagos. Available for e-commerce deliveries, document dispatch, food delivery, and errand runs. Covering all Lagos areas including Island and Mainland. Real-time tracking available. Own bike and phone.",
    chips: ["Transport", "On-site", "Same Day"],
    rating: 4.5,
    reviewCount: 156,
  },
  {
    id: 7,
    company: "Tunde Visuals",
    role: "Graphic Designer & Brand Identity",
    date: "31st May 2025",
    salary: "₦25,000/project",
    salaryValue: 25000,
    location: "Abuja",
    logo: "/assets/images/logo.jpeg",
    category: "tech",
    description: "Creative graphic designer specialising in brand identity, social media graphics, flyers, banners, and business card design. Tools: Adobe Illustrator, Photoshop, and Canva Pro. Fast delivery with unlimited revisions. Over 200 satisfied clients.",
    chips: ["Tech", "Remote", "Branding"],
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: 8,
    company: "Ade Plumbing Works",
    role: "Licensed Plumber",
    date: "7th June 2025",
    salary: "₦10,000/job",
    salaryValue: 10000,
    location: "Ibadan",
    logo: "/assets/images/logo.jpeg",
    category: "home-services",
    description: "Licensed and experienced plumber available for pipe installations, leak repairs, bathroom fittings, and general plumbing maintenance. I carry my own tools and source quality materials at fair prices. Emergency call-outs available. Serving Ibadan and environs.",
    chips: ["Home Services", "On-site", "Emergency"],
    rating: 4.7,
    reviewCount: 73,
  },
  {
    id: 9,
    company: "Glam by Sola",
    role: "Professional Makeup Artist",
    date: "8th June 2025",
    salary: "₦30,000/occasion",
    salaryValue: 30000,
    location: "Lagos",
    logo: "/assets/images/logo.jpeg",
    category: "fashion",
    description: "Certified makeup artist specialising in bridal, aso-ebi, photoshoot, and everyday glam. I use high-end, skin-safe products suitable for all skin tones including dark skin. Available for home visits across Lagos. Bookings close 2 weeks before event date.",
    chips: ["Fashion", "Home Visit", "Bridal"],
    rating: 4.9,
    reviewCount: 311,
  },
];


export const savedFilters = [
  {
    title: 'Farming',
    location: 'Allen avenue Ikeja, Lagos',
    distance: 'Not available',
    price: '₦5000 - ₦10,000',
  },
  {
    title: 'Lesson teacher',
    location: 'Allen avenue Ikeja, Lagos',
    distance: 'Not available',
    price: '₦5000 - ₦10,000',
  },
];

export const notificationsData = [
  {
    id: 1,
    title: "Application Viewed",
    message: "Your application for Senior UX/UI Designer at Amazon was viewed.",
    time: "2 hours ago",
    read: false,
    type: "application"
  },
  {
    id: 2,
    title: "New Job Alert",
    message: "A new job matching your profile 'Software Engineer' is available at Google.",
    time: "5 hours ago",
    read: false,
    type: "job"
  },
  {
    id: 3,
    title: "Profile Update",
    message: "Your profile is 80% complete. Add your resume to reach 100%.",
    time: "1 day ago",
    read: true,
    type: "system"
  },
  {
    id: 4,
    title: "Interview Request",
    message: "Microsoft has requested an interview for Data Scientist role.",
    time: "2 days ago",
    read: true,
    type: "interview"
  }
];

export const initialUserData = {
  name: "Ayodele Oluwaseyi",
  location: "Ilorin, Kwara State",
  profileImage: "",
  notifications: 5,
  role: "UX/UI Designer",
  email: "ayodelewaseyi@gmail.com",
  phone: "08047748383",
  verified: true,
  verifiedDate: new Date().toISOString(),
  jobsPosted: 12,
  coinsLeft: 300,
};
