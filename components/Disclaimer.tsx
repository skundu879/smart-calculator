import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Disclaimer: React.FC = () => {
  return (
    <Alert className='mt-4'>
      <AlertTitle>Disclaimer**</AlertTitle>
      <AlertDescription className='font-normal text-xs md:text-sm'>
        The Quick Calculator app provides estimates only and should not be
        relied upon as financial advice. Results are based on user input and
        assumptions, and actual outcomes may differ.
      </AlertDescription>
    </Alert>
  );
};

export default Disclaimer;
