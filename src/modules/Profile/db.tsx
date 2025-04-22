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
  