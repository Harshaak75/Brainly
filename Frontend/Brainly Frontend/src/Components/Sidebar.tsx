import { SidebarItems } from "./SidebarItems";

import { TwitterIcon } from "../icons/TwitterIcon";
import { SideYoutube } from "../icons/SideYoutube";
import { BrainIcon } from "../icons/Brain";

export function Sidebar() {
  return (
    <div className="w-64 bg-white left-0 top-0 h-screen fixed border-r-2 pl-2">
      <div className="flex items-center text-2xl pt-6">
        <div className="text-purple-800"><BrainIcon/></div>
        Brainly
      </div>
      <div className="pt-4">
        <SidebarItems title="Twitter" icon={<TwitterIcon />} />
        <SidebarItems title="Youtube" icon={<SideYoutube />} />
      </div>
    </div>
  );
}
