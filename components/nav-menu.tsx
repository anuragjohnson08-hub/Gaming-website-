import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Open navigation menu"
          className="md:hidden h-8 w-8 p-0 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white cursor-pointer"
        >
          <Icons.menu className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border border-white/[0.1] bg-[#0a0814]/95 backdrop-blur-md text-zinc-100 p-1.5"
      >
        <DropdownMenuItem asChild>
          <Link href="/browse/ios/apps" className="cursor-pointer rounded-lg">
            <span>All Games</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/#platforms" className="cursor-pointer rounded-lg">
            <span>Platforms</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/#critic-consensus" className="cursor-pointer rounded-lg">
            <span>Critic Consensus</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/#pricing" className="cursor-pointer rounded-lg">
            <span>Pricing</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/#about" className="cursor-pointer rounded-lg">
            <span>About</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/[0.08]" />
        <DropdownMenuItem asChild>
          <Link
            href="/#join-stream"
            className="cursor-pointer rounded-lg text-purple-300 font-medium"
          >
            <span>Join Fluid Flow</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
