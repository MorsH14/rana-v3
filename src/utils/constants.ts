interface HeaderLinkProps {
  label: string;
  route: string;
}

export const WorkerHeaderLink: HeaderLinkProps[] = [
  { label: "Post a service", route: "/post-job" },
  { label: "Messages", route: "/Messages" },
];

export const ClientHeaderLink: HeaderLinkProps[] = [
  { label: "Find job", route: "/" },
  { label: "Messages", route: "/Messages" },
];

interface FooterLinkProps {
  label: string;
  route: string;
  icon: string;
}

export const WorkerFooterLink: FooterLinkProps[] = [
  { label: "Home", route: "/", icon: "House" },
  { label: "Post", route: "/post-job", icon: "PlusCircle" },
  { label: "Messages", route: "/Messages", icon: "ChatCircle" },
  { label: "Alerts", route: "/notification", icon: "Bell" },
  { label: "Profile", route: "/profile", icon: "UserCircle" },
];

export const ClientFooterLink: FooterLinkProps[] = [
  { label: "Home", route: "/", icon: "House" },
  { label: "Messages", route: "/Messages", icon: "ChatCircle" },
  { label: "Alerts", route: "/notification", icon: "Bell" },
  { label: "Profile", route: "/profile", icon: "UserCircle" },
];

    // FILTER DROP DOWN
  export const options = [
    { value: "all", label: "All Categories" },
    { value: "education", label: "Education" },
    { value: "tech", label: "Tech & Digital" },
    { value: "home-services", label: "Home Services" },
    { value: "fashion", label: "Fashion & Beauty" },
    { value: "food-events", label: "Food & Events" },
    { value: "transport", label: "Transport" },
  ];

  export const amount = [
    { value: "price", label: "All Prices" },
    { value: 5000, label: "Under ₦5,000" },
    { value: 10000, label: "Under ₦10,000" },
    { value: 20000, label: "Under ₦20,000" },
    { value: 50000, label: "Under ₦50,000" },
  ];

  export const location = [
    { value: "state", label: "All States" },
    { value: "Lagos", label: "Lagos" },
    { value: "Abuja", label: "Abuja" },
    { value: "Port Harcourt", label: "Port Harcourt" },
    { value: "Ibadan", label: "Ibadan" },
  ];
  // export const states = [
  //   { value: "lagos", label: "Lagos" },
  //   { value: "abuja", label: "Abuja" },
  //   { value: "port_harcourt", label: "Port Harcourt" },
  // ];
  