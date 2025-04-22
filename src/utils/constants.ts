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
