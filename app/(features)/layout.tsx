import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const FeaturesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className=' h-full flex flex-col gap-12 p-4'>
      <CustomBreadcrumb />
      <div>{children}</div>
    </main>
  );
};

export default FeaturesLayout;