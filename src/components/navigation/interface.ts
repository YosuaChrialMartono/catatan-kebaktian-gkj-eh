import { LucideIcon } from "lucide-react";

export interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface NavItemsProps {
    title: string;
    icon: LucideIcon;
    link: string;
}