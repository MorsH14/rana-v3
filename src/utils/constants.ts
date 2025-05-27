interface HeaderLinkProps {
    label: string;
    route: string;
  }
  
export const HeaderLink: HeaderLinkProps[] = [
    {label: "Find job", route: "/find-jobs" },
    {label: "Messages", route: "/Messages" },
    {label: "Hiring", route: "/Hiring" },
    {label: "FAQ", route: "/FAQ" },
]

interface FooterLinkProps {
    label: string;
    route: string;
    icon: string; 
  }

  export const FooterLink: FooterLinkProps[] = [
    { label: "Home", route: "/", icon: "House" },
    { label: "Messages", route: "/Messages", icon: "Chat" },
    { label: "Profile", route: "/profile", icon: "Briefcase" },
  ];

    // FILTER DROP DOWN
  export const options = [
    { value: "designer", label: "Designer" },
    { value: "graphics", label: "Graphics" },
    { value: "website", label: "Website" },
  ];
  
  export const amount = [
    { value: "price", label: "Price" }, // Ensure "Price" is a string
    { value: 1000, label: "₦1,000" },
    { value: 5000, label: "₦5,000" },
    { value: 10000, label: "₦10,000" },
  ];
  
  export const location = [
    { value: "lagos", label: "Lagos" },
    { value: "abuja", label: "Abuja" },
    { value: "port_harcourt", label: "Port Harcourt" },
  ];
  export const states = [
    { value: "lagos", label: "Lagos" },
    { value: "abuja", label: "Abuja" },
    { value: "port_harcourt", label: "Port Harcourt" },
  ];
  