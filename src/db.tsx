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
    company: "Amazon",
    role: "Senior UX/UI Designer",
    date: "20th May 2024",
    salary: "$120/hr",
    location: "California, CA",
    logo: "/assets/images/logo.jpeg",
    chips: ["Full-Time", "Remote", "UX/UI"],
  },
  {
    company: "Google",
    role: "Software Engineer",
    date: "15th June 2024",
    salary: "$150/hr",
    location: "New York, NY",
    logo: "/assets/images/logo.jpeg",
    chips: ["Full-Time", "Hybrid", "Backend"],
  },
  {
    company: "Microsoft",
    role: "Data Scientist",
    date: "10th July 2024",
    salary: "$130/hr",
    location: "Seattle, WA",
    logo: "/assets/images/logo.jpeg",
    chips: ["Full-Time", "Remote", "AI/ML"],
  },
  {
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2024",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "/assets/images/logo.jpeg",
    chips: ["Contract", "On-site", "React"],
  },
  {
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2024",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "/assets/images/logo.jpeg",
    chips: ["Part-Time", "Remote", "Security"],
  },
  {
    company: "Netflix",
    role: "DevOps Engineer",
    date: "12th August 2024",
    salary: "$145/hr",
    location: "Los Gatos, CA",
    logo: "/assets/images/logo.jpeg",
    chips: ["Full-Time", "Remote", "DevOps"],
  },
  {
    company: "Apple",
    role: "iOS Developer",
    date: "22nd August 2024",
    salary: "$135/hr",
    location: "Cupertino, CA",
    logo: "/assets/images/logo.jpeg",
    chips: ["Contract", "On-site", "Swift"],
  },
  {
    company: "Spotify",
    role: "Product Manager",
    date: "5th September 2024",
    salary: "$125/hr",
    location: "New York, NY",
    logo: "/assets/images/logo.jpeg",
    chips: ["Full-Time", "Hybrid", "Product"],
  },
  {
    company: "Airbnb",
    role: "Full Stack Developer",
    date: "10th September 2024",
    salary: "$130/hr",
    location: "San Francisco, CA",
    logo: "/assets/images/logo.jpeg",
    chips: ["Full-Time", "Remote", "JavaScript"],
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
