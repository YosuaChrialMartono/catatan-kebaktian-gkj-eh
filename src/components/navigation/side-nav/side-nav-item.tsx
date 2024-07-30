import Link from "next/link";
import { Button } from "../../ui/button";
import { NavItemsProps } from "../interface";

const SideNavItem = (props: NavItemsProps) => {
  return (
    <Button asChild variant={"ghost"} className="flex w-full justify-start">
      <Link href={props.link} className="flex w-full justify-start gap-4">
        <props.icon /> {props.title}
      </Link>
    </Button>
  );
};

export default SideNavItem;
