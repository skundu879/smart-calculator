import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
export const customSortingHeader = ({
  column,
  header,
}: {
  column: any;
  header: any;
}) => {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {header}
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
};
