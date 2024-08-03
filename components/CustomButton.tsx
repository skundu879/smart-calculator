import { Button } from './ui/button';

const CustomButton = ({ children, ...props }: any) => {
  return (
    <Button
      {...props}
      className='bg-cyan-500 hover:bg-cyan-600 text-white h-8 sm:h-10 rounded-md flex flex-row  gap-2'
      size={'sm'}
    >
      {children}
    </Button>
  );
};
export default CustomButton;
