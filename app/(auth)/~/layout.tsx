import Middleware from "@/components/providers/middleware";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Middleware>
      <main className="fixed inset-0 flex items-center justify-center px-6">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
        {children}
      </main>
    </Middleware>
  );
}
