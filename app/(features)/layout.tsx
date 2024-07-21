import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const FeaturesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex flex-col gap-6 p-4 min-h-screen'>
      <CustomBreadcrumb />
      <div>{children}</div>
    </main>
  );
};

export default FeaturesLayout;
