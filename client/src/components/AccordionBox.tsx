import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "./molecules/Accordion";

interface AccordionProps {
  items: {
    title: string;
    content: string;
  }[];
}

const AccordionComponent: React.FC<AccordionProps> = ({ items }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
