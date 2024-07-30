import Link from "next/link";
import { NavItemsProps } from "../interface";
const TopNavItem = (item: NavItemsProps) => {
  return (
    <Link href={item.link} className="flex gap-2 w-full justify-start">
      <item.icon />
      <a>{item.title}</a>
    </Link>
  );
};
export default TopNavItem;
