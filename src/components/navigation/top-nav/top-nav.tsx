import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

import { LayoutPanelLeftIcon } from "lucide-react";
import { NavItems } from "../NavItems";
import TopNavItem from "./top-nav-item";
const TopNav = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <LayoutPanelLeftIcon />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:max-w-xs">
          <SheetHeader>
            <SheetTitle>
              <h1 className="text-xl font-bold">Catatan Kebaktian GKJ EH</h1>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 pt-4">
            {NavItems.map((item, index) => (
              <TopNavItem key={index} {...item} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default TopNav;
