"use client";

import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface Props {
  title: string;
  subtitle?: string | null;
  href?: string | null;
  hrefText?: string | null;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  title,
  subtitle = null,
  href = null,
  hrefText = "Agregar",
  children,
  className = "",
}: Props) {
  return (
    <section className={cn("flex h-full w-full flex-col gap-4", className)}>
      <header className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm opacity-75">{subtitle}</p>}
        {href && (
          <Button asChild>
            <Link href={href}>
              <PlusIcon className="mr-2 h-4 w-4" />
              {hrefText}
            </Link>
          </Button>
        )}
      </header>
      {children}
    </section>
  );
}
