'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const CustomBreadcrumb = () => {
  const router = usePathname();

  const pathSegments = router.split('/');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          if (index === 0) {
            // Handle the root path (/)
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
            );
          }

          const currentPath = pathSegments.slice(0, index + 1).join('/');
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator key={`separator-${index}`} />
              <BreadcrumbItem key={index}>
                <BreadcrumbPage> {segment}</BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
