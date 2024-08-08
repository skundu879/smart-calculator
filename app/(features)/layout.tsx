import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const FeaturesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-col gap-6 mt-4 mb-4'>
      <div className='px-4 sm:px-0'>
        <CustomBreadcrumb />
      </div>
      <div className='px-2'>{children}</div>
    </div>
  );
};

export default FeaturesLayout;
