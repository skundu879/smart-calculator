import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Disclaimer: React.FC = () => {
  return (
    <Alert>
      <AlertTitle>Disclaimer**</AlertTitle>
      <AlertDescription className='font-normal text-xs md:text-sm'>
        The SIP Calculator app is intended for informational and illustrative
        purposes only. The calculations provided by this app are based on user
        inputs and certain assumptions, and they should not be considered as
        financial advice or recommendations. The actual returns on investments
        may vary due to market fluctuations, changes in interest rates, taxes,
        and other unforeseen factors.
      </AlertDescription>
    </Alert>
  );
};

export default Disclaimer;
