export default function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <section className="fixed left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-center backdrop-blur-xl">
      {children}
    </section>
  );
}
