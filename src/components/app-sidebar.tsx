// "use client";

// import * as React from "react";
// import { Bot, Settings, SquareTerminal } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { NavMain } from "./nav-main";
// import { NavUser } from "./nav-user";
// import Link from "next/link";
// import Logo from "@/assets/svgs/Logo";
// import { useUser } from "@/context/UserContext";

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { user } = useUser();
//   // Create base nav items that all roles can see
//   const baseNavItems = [
//     {
//       title: "Dashboard",
//       url: `/dashboard/${user?.role}`,
//       icon: SquareTerminal,
//       isActive: true,
//       items: [],
//     },
//     {
//       title: "Jobs",
//       url: `/dashboard/${user?.role}/job`,
//       icon: Bot,
//       items: [
//         {
//           title: "Manage Jobs",
//           url: `/dashboard/${user?.role}/job`,
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings,
//       items: [
//         {
//           title: "Profile",
//           url: `/dashboard/${user?.role}/profile`,
//         },
//       ],
//     },
//   ];

//    // Add admin-specific items if user is an admin
//   if (user?.role === "admin") {
//     // Add "Manage Users" to the Dashboard section for admin
//     baseNavItems[0].items.push({
//       title: "Manage Users",
//       url: `/dashboard/${user.role}/users`,
//       icon: Users,
//     });
//   }

//   const data = {
//     navMain: baseNavItems,
//   };
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/">
//                 <div className="flex items-center justify-center">
//                   <Logo />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <h2 className="font-bold text-xl">NextMart</h2>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
"use client";

import * as React from "react";
import { Bot, Settings, SquareTerminal, Users, LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { useUser } from "@/context/UserContext";

// Define the type for navigation items that matches NavMain's expectations
interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubItem[];
}

interface SubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Create base nav items that all roles can see with proper typing
  const baseNavItems: NavItem[] = [
    {
      title: "Dashboard",
      url: `/dashboard/${user?.role || "user"}`,
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Jobs",
      url: `/dashboard/${user?.role || "user"}/job`,
      icon: Bot,
      items: [
        {
          title: "Manage Jobs",
          url: `/dashboard/${user?.role || "user"}/job`,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: `/dashboard/${user?.role || "user"}/profile`,
        },
      ],
    },
  ];

  // Add admin-specific items if user is an admin
  if (user?.role === "admin") {
    // Add "Manage Users" to the Dashboard section for admin
    baseNavItems[0].items?.push({
      title: "Manage Users",
      url: `/dashboard/${user.role}/users`,
      icon: Users,
    });
  }

  const data = {
    navMain: baseNavItems,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NextMart</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
