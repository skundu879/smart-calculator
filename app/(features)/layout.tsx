import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const FeaturesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className=' p-4'>
      <div className='flex flex-col gap-6'>
        <CustomBreadcrumb />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default FeaturesLayout;
