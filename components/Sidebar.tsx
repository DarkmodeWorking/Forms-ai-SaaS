import React, { JSX } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

import { ChartSpline, ClipboardList } from 'lucide-react';
import { Separator } from './ui/separator';
import Link from 'next/link';
import UpgradeButton from './UpgradeButton';
import { currentUser } from '@clerk/nextjs/server';

type MenuItems = {
  title: string;
  url: string;
  icon: JSX.Element;
};

const items: MenuItems[] = [
  {
    title: 'ANALYTICS',
    url: '/dashboard/analytics',
    icon: <ChartSpline />,
  },
  {
    title: 'MY FORMS',
    url: '/dashboard/forms',
    icon: <ClipboardList />,
  },
];

const DashboardSidebar = async () => {
  const user = await currentUser();
  return (
    <Sidebar>
      <SidebarContent className='bg-background'>
        <SidebarGroup>
          <SidebarGroupLabel className='my-8 flex items-center justify-between'>
            <Link href={'/'} className='font-bold text-3xl'>
              <span className='text-primary'>FORMS</span> • AI
            </Link>
          </SidebarGroupLabel>
          <Separator className='my-2'/>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItems, index: number) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className='mt-4' asChild>
                    <Link className='text-primary' href={item.url}>
                      {item.icon}
                      <span className='text-white text-lg'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-background'>
        <UpgradeButton userId={user?.id}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;