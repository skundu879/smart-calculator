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

type TableDialogProps = {
  label: string;
  children: React.ReactNode;
  title: string;
  description: string;
};

const TableDialog = (props: TableDialogProps) => {
  const { title, children, label, description } = props;

  return (
    <div className='w-max'>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='default'
            className='bg-slate-200 hover:bg-slate-300 text-slate-800'
          >
            {label}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableDialog;
