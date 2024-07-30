import { NavItems } from "../NavItems";
import SideNavItem from "./side-nav-item";

export default function SideNav() {
  const content = NavItems.map((item, index) => {
    return (
      <SideNavItem
        key={index}
        title={item.title}
        icon={item.icon}
        link={item.link}
      />
    );
  });
  return (
    <div className="hidden md:block h-full p-4">
      <div className="w-[280px] h-full border rounded-xl bg-background">
        <nav className="flex flex-col gap-4 p-4">{content}</nav>
      </div>
    </div>
  );
}
