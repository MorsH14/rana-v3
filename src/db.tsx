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
    comment: 'A very professional team. I am happy with the service. lorem10 am happy with the service. lorem10am happy with the service. lorem10am happy with the service. lorem10am happy with the service. lorem10am happy with the service. lorem10am happy with the service. lorem10am happy with the service. lorem10am happy with the service. lorem10',
    imgSrc: './assets/li.png'
  },
  {
    author: 'Jane Smith',
    comment: 'The experience was excellent. Will use their services again.',
    imgSrc: './assets/xx.png'
  }
];

export const jobData = [
  {
    id: 1,
    company: "Amazon",
    role: "Senior UX/UI Designer",
    date: "20th May 2023",
    salary: "$120/hr",
    location: "California, CA",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Full-Time", "Remote", "UX/UI"],
  },
  {
    id: 2,
    company: "Google",
    role: "Software Engineer",
    date: "15th June 2023",
    salary: "$150/hr",
    location: "New York, NY",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Full-Time", "Hybrid", "Backend"],
  },
  {
    id: 3,
    company: "Microsoft",
    role: "Data Scientist",
    date: "10th July 2023",
    salary: "$130/hr",
    location: "Seattle, WA",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Full-Time", "Remote", "AI/ML"],
  },
  {
    id: 4,
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2023",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Contract", "On-site", "React"],
  },
  {
    id: 5,
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2023",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Part-Time", "Remote", "Security"],
  },
  {
    id: 6,
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2023",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Contract", "On-site", "React"],
  },
  {
    id: 7,
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2023",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Part-Time", "Remote", "Security"],
  },
  {
    id: 8,
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2023",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Contract", "On-site", "React"],
  },
  {
    id: 9,
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2023",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "/assets/images/logo.jpeg",
    description: "I teach primary 3-6 Maths and English language and computer subjects only.",
    chips: ["Part-Time", "Remote", "Security"],
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

export const initialUserData = {
  name: "Ayodele Oluwaseyi",
  location: "Ilorin, Kwara State",
  profileImage: "",
  notifications: 5,
  role: "UX/UI Designer",
  email: "ayodelewaseyi@gmail.com",
  phone: "08047748383",
  verified: true,
};
