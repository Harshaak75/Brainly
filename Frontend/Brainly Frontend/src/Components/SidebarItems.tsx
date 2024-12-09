
interface sidebaritemstype {
    title: string;
    icon: React.ReactElement;
}

export function SidebarItems({title, icon}: sidebaritemstype){
    return <div className="flex text-gray-600 items-center px-3 hover:bg-gray-200 max-w-48 cursor-pointer pl-3 transition-all rounded-md">
        <div className="p-2">
        {icon}
        </div>
        <div className="pl-1">
         {title}
         </div>
    </div>
}