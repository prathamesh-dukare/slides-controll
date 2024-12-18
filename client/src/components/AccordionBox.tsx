import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "./ui/Accordion";

export default function AccordionComponent() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
