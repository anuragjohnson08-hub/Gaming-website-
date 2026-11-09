"use client"

import * as React from "react";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";

const ThemeToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div ref={ref} className={cn("flex space-x-2", className)} {...props}>
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("flex space-x-1", className)} {...props}>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        className="w-full"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="icon"
        className="w-full"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="icon"
        className="w-full"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-5 w-5" />
      </Button>
    </div>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;