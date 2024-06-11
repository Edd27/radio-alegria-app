"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Brush,
  BrushIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  Moon,
  Sun,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  type: "button" | "menu" | "submenu" | "collapsible";
  icons?: boolean;
}

export function ModeToggle({ type = "button", icons = true }: Props) {
  const { setTheme, theme } = useTheme();

  if (type === "button") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Change theme</span>
      </Button>
    );
  }

  if (type === "menu") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Change theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("light")}
          >
            {icons ? <Sun className="mr-2 h-4 w-4" /> : null}
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            {icons ? <Moon className="mr-2 h-4 w-4" /> : null}
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("system")}
          >
            {icons ? <SunMoon className="mr-2 h-4 w-4" /> : null}
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (type === "collapsible") {
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="relative w-full cursor-pointer justify-start gap-2 font-semibold"
          >
            <BrushIcon />
            <span>Theme</span>
            <ChevronsUpDownIcon className="absolute right-4 h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col">
          <Button
            variant="ghost"
            className="relative w-full cursor-pointer justify-start gap-2 font-semibold"
            onClick={() => setTheme("light")}
          >
            {icons ? <Sun className="mr-2 h-4 w-4" /> : null}
            <span>Light</span>
            {theme === "light" && (
              <CheckIcon className="absolute right-4 h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            className="relative w-full cursor-pointer justify-start gap-2 font-semibold"
            onClick={() => setTheme("dark")}
          >
            {icons ? <Moon className="mr-2 h-4 w-4" /> : null}
            <span>Dark</span>
            {theme === "dark" && (
              <CheckIcon className="absolute right-4 h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            className="relative w-full cursor-pointer justify-start gap-2 font-semibold"
            onClick={() => setTheme("system")}
          >
            {icons ? <SunMoon className="mr-2 h-4 w-4" /> : null}
            <span>System</span>
            {theme === "system" && (
              <CheckIcon className="absolute right-4 h-4 w-4" />
            )}
          </Button>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (type === "submenu") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="cursor-pointer">
          <Brush className="mr-2 h-4 w-4" />
          <span>Theme</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("light")}
            >
              {icons ? <Sun className="mr-2 h-4 w-4" /> : null}
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              {icons ? <Moon className="mr-2 h-4 w-4" /> : null}
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("system")}
            >
              {icons ? <SunMoon className="mr-2 h-4 w-4" /> : null}
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }

  return null;
}
