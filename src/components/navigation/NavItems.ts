import { BookMarked, UserRound, UsersRound } from "lucide-react";
import { NavItemsProps } from "./interface";

export const NavItems: NavItemsProps[] = [
    {
        title: "Catatan Kebaktian",
        icon: BookMarked,
        link: "/"
    },
    {
        title: "Majelis",
        icon: UsersRound,
        link: "/about"
    },
    {
        title: "Pelayan Firman",
        icon: UserRound,
        link: "/contact"
    }
] 