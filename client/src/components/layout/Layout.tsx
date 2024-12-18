import { Container } from "./Container";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">Slide Control</h1>
          </div>
        </Container>
      </nav>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
