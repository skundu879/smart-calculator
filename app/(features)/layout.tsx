import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const FeaturesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='px-4 mt-4'>
      <div className='flex flex-col gap-6 mb-6'>
        <CustomBreadcrumb />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default FeaturesLayout;
