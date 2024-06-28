import AudioPlayer from "@/components/player/audio-player";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 lg:px-32 xl:px-64">
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between gap-3 bg-background p-4 lg:px-32 xl:px-64">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold"
        >
          <Image
            src="/cover.jpg"
            alt="Logo de Radio Alegria"
            width={200}
            height={200}
            priority
            className="h-10 w-10 select-none overflow-clip rounded-lg bg-clip-content object-cover object-center"
          />
        </Link>
        <nav className="flex items-center gap-3">
          <ModeToggle
            type="button"
            icons={true}
          />
        </nav>
      </header>
      <section className="pt-16">
        <AudioPlayer />
        <footer className="mt-10 max-w-xs text-pretty text-center">
          <small>
            Este sitio es solo transmisión en vivo, para más información visite
            el sitio web oficial de{" "}
            <a
              href="https://www.radiomoroleon.mx/Inicio/"
              target="_blank"
              className="whitespace-nowrap font-semibold text-primary underline"
            >
              Radio Alegría Moroleón
            </a>
          </small>
        </footer>
      </section>
    </div>
  );
}
