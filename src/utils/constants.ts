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