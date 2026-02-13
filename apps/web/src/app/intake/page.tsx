import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Đăng ký tư vấn OpenClaw',
  description: 'Đăng ký nhận tư vấn và demo miễn phí OpenClaw Setup & Support từ Long Best AI',
};

export default function IntakePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Đăng ký nhận tư vấn OpenClaw miễn phí
          </h1>
          <p className="text-lg text-muted-foreground">
            Điền form bên dưới hoặc liên hệ trực tiếp qua Zalo để được tư vấn và demo
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Form đăng ký đang được chuẩn bị</CardTitle>
            <CardDescription>
              Trong thời gian này, vui lòng liên hệ trực tiếp qua các kênh sau để được hỗ trợ nhanh nhất
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="flex-1">
                <a href="https://zalo.me/g/uwawns336" target="_blank" rel="noopener noreferrer">
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.739 4.304 1.986 5.973L2.05 21.95l4.022-1.935A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                  Tham gia nhóm Zalo
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="flex-1">
                <a href="tel:0903469888">
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Gọi Zalo: 0903 469 888
                </a>
              </Button>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-semibold mb-2">Bạn sẽ nhận được:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Tư vấn miễn phí về gói phù hợp với nhu cầu</li>
                <li>✓ Demo trực tiếp tính năng OpenClaw</li>
                <li>✓ Báo giá chi tiết và roadmap triển khai</li>
                <li>✓ Hỗ trợ 24/7 qua Zalo trong quá trình sử dụng</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Thời gian phản hồi:{' '}
            <span className="font-semibold text-foreground">Trong vòng 2 giờ</span> (giờ hành chính)
          </p>
        </div>
      </div>
    </div>
  );
}
