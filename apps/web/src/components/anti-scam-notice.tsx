import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AntiScamNoticeProps {
  className?: string;
}

export function AntiScamNotice({ className }: AntiScamNoticeProps) {
  return (
    <Card className={cn('border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20', className)}>
      <CardContent className="flex gap-3 py-4">
        <div className="shrink-0 text-amber-600 dark:text-amber-400">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="text-sm leading-relaxed text-amber-900 dark:text-amber-100">
          <strong className="font-semibold">Lưu ý chống lừa đảo:</strong> Long Best AI chỉ liên lạc qua Zalo{' '}
          <span className="font-mono font-semibold">0903 469 888</span> và group chính thức. Không bao giờ yêu cầu
          chuyển khoản trước hoặc OTP cho tài khoản lạ.
        </div>
      </CardContent>
    </Card>
  );
}
