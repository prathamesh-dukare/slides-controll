import { Button } from "../components/ui/Button";
import { Layout } from "../components/layout/Layout";
import AccordionComponent from "../components/AccordionBox";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-4 my-[10rem]">
        <Button onClick={() => {}}>Create Presentation Session</Button>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 w-full mx-auto max-w-screen-sm pb-8">
        <AccordionComponent />
        <AccordionComponent />
        <AccordionComponent />
      </footer>
    </Layout>
  );
}
