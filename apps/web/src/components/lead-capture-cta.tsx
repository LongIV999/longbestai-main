import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LeadCaptureCtaProps {
  variant?: 'button' | 'banner';
  text?: string;
  className?: string;
}

export function LeadCaptureCta({ variant = 'button', text, className }: LeadCaptureCtaProps) {
  if (variant === 'button') {
    return (
      <Button asChild size="lg" className={cn('w-full md:w-auto', className)}>
        <Link href="/intake">
          {text || 'Đăng ký nhận tư vấn miễn phí'}
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </Button>
    );
  }

  return (
    <Card className={cn('border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10', className)}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {text || 'Sẵn sàng tự động hóa với OpenClaw?'}
        </CardTitle>
        <CardDescription className="text-base">
          Đăng ký nhận tư vấn miễn phí và demo trực tiếp từ đội ngũ chuyên gia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild size="lg" className="w-full md:w-auto">
          <Link href="/intake">
            Đăng ký ngay
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
