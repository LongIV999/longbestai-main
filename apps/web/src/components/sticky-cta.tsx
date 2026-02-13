'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StickyCtaProps {
  className?: string;
}

export function StickyCta({ className }: StickyCtaProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'border-t bg-background/80 backdrop-blur-md',
        'shadow-lg',
        className
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-2 gap-2 md:flex md:items-center md:justify-center md:gap-3">
          <Button
            asChild
            variant="default"
            size="sm"
            className="w-full md:w-auto"
          >
            <a
              href="https://zalo.me/g/uwawns336"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.739 4.304 1.986 5.973L2.05 21.95l4.022-1.935A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              Nhóm Zalo
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full md:w-auto"
          >
            <a href="tel:0903469888">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Zalo: 0903 469 888
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
