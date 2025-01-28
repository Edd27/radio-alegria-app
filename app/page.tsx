import AudioPlayer from "@/components/player/audio-player";
import { ModeToggle } from "@/components/ui/mode-toggle";
import UserInteraction from "@/components/user/user-interaction";
import Image from "next/image";
import Link from "next/link";
import { metadata } from "./layout";

export default async function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto,1fr,auto] bg-background">
      <header className="flex h-fit items-center justify-between gap-3 bg-background p-4 shadow">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold"
        >
          <Image
            src="/cover.jpg"
            alt="Logo de Radio Alegría"
            width={200}
            height={200}
            priority
            className="h-10 w-10 select-none overflow-clip rounded-lg bg-clip-content object-cover object-center"
          />
          {metadata.title && (
            <h1 className="hidden text-3xl font-light uppercase md:block">
              {metadata.title as string}
            </h1>
          )}
        </Link>
        <nav className="flex items-center gap-3">
          <ModeToggle
            type="menu"
            icons={true}
          />
        </nav>
      </header>
      <div className="flex w-full flex-col gap-4 p-4 lg:flex-row">
        <AudioPlayer />
        <UserInteraction />
        <aside className="flex max-h-[754px] w-full items-center justify-center rounded-lg border p-4 text-center lg:w-1/3">
          <h2 className="text-2xl font-bold text-primary">Proximamente</h2>
        </aside>
      </div>
      <footer className="flex w-full items-center justify-center text-pretty border-t px-4 pb-16 pt-4 text-center shadow lg:pb-4">
        <small>
          Este sitio es solo transmisión en vivo, para más información visite el
          sitio web oficial de{" "}
          <a
            href="https://www.radiomoroleon.mx/Inicio/"
            target="_blank"
            className="whitespace-nowrap font-semibold text-primary underline"
          >
            Radio Alegría Moroleón
          </a>
        </small>
      </footer>
    </div>
  );
}
