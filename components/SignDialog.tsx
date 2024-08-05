import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CustomButton from './CustomButton';

type SignDialogProps = {
  onModelChange: () => void;
  open: boolean;
  label: string;
  children: React.ReactNode;
  title: string;
  description: string;
  handleSave: () => void;
  handleClear: () => void;
};

const SignDialog = ({
  onModelChange,
  open,
  label,
  children,
  description,
  title,
  handleSave,
  handleClear,
}: SignDialogProps) => {
  return (
    <div className='w-max p-0'>
      <Dialog
        open={open}
        onOpenChange={onModelChange}
      >
        <DialogTrigger asChild>
          <CustomButton>{label}</CustomButton>
        </DialogTrigger>
        <DialogContent className='items-center'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className='flex flex-row justify-between'>
            <Button
              variant='default'
              className='bg-cyan-500 hover:bg-cyan-600 text-white'
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant='default'
              className='bg-red-500 hover:bg-red-600 text-white'
              onClick={handleClear}
            >
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SignDialog;
