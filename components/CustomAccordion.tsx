import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type item = {
  title: string;
  content: string;
};

type CustomAccordionProps = {
  items: Array<item>;
};

const CustomAccordion = ({ items }: CustomAccordionProps) => {
  return (
    <Accordion
      type='single'
      collapsible
      className='w-full'
    >
      {items.map((obj, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
        >
          <AccordionTrigger>{obj.title}</AccordionTrigger>
          <AccordionContent>{obj.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
