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
      <div className="flex flex-col justify-between w-[280px] h-full border rounded-xl bg-background p-3">
        <div className="w-full">
          <span className="flex justify-center text-lg font-extrabold text-foreground text-center w-full">
            Catatan Kebaktian GKJ EH
          </span>
          <nav className="flex flex-col gap-4 p-4">{content}</nav>
        </div>
        <span className="mt-auto text-xs text-foreground text-center">
          © 2024 GKJ EH
        </span>
      </div>
    </div>
  );
}
