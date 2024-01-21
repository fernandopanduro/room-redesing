import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full h-20 px-8 py-2 md:px-16 md:py-3 z-10 backdrop-blur-md flex gap-4 items-center justify-between">
      <h1 className="text-2xl font-bold uppercase">Redesing Room</h1>

      <div className="flex items-center gap-3 md:gap-6">
        <HoverCard>
          <HoverCardTrigger>
            <a
              href="https://github.com/fernandopanduro/room-redesing"
              target="_blank"
              rel="noopener noreferrer">
              <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
            </a>
          </HoverCardTrigger>
          <HoverCardContent>
            Creado y mantenido por{" "}
            <a
              className="text-blue-700 dark:text-blue-500"
              href="https://github.com/fernandopanduro"
              target="_blank">
              @fernandopanduro
            </a>
            .
          </HoverCardContent>
        </HoverCard>

        <ModeToggle />
      </div>
    </header>
  );
}
