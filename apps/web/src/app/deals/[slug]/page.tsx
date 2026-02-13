import { notFound } from 'next/navigation';
import { getDealBySlug, getAllDealSlugs } from '@/lib/content/deals';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadCaptureCta } from '@/components/lead-capture-cta';
import { AntiScamNotice } from '@/components/anti-scam-notice';
import type { DealItem } from '@longbestai/shared';

export async function generateStaticParams() {
  return getAllDealSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) return {};

  return {
    title: `${deal.title} - LongBestAI`,
    description: deal.notes || `Chi tiết về ${deal.title}`
  };
}

export default async function DealPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  const priceDisplay = typeof deal.price === 'number'
    ? `${deal.price.toLocaleString('vi-VN')}đ`
    : deal.price;

  return (
    <div className="container mx-auto px-4 py-16 pb-24 max-w-4xl space-y-8">
      <h1 className="text-4xl font-bold mb-4">{deal.title}</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {deal.tags.map((tag: string) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>

      <div className="text-3xl font-bold text-primary mb-8">
        {priceDisplay}
      </div>

      {deal.items && deal.items.length > 0 ? (
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Các gói dịch vụ</h2>
          {deal.items.map((item: DealItem, idx: number) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                  <span>{item.title}</span>
                  <div className="flex items-center gap-2">
                    {item.cost && (
                      <span className="text-sm text-muted-foreground line-through">
                        {typeof item.cost === 'number'
                          ? `${item.cost.toLocaleString('vi-VN')}đ`
                          : item.cost}
                      </span>
                    )}
                    {item.retail && (
                      <span className="text-lg font-bold text-primary">
                        {typeof item.retail === 'number'
                          ? `${item.retail.toLocaleString('vi-VN')}đ`
                          : item.retail}
                      </span>
                    )}
                    {item.cost && item.retail && (
                      <Badge variant="destructive" className="ml-1">
                        -50%
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {item.duration && (
                  <p className="text-sm">
                    <span className="font-semibold">Phí duy trì:</span>{' '}
                    <span className="text-primary font-semibold">{item.duration}</span>
                  </p>
                )}
                {item.warranty && (
                  <p className="text-sm">
                    <span className="font-semibold">Bảo hành:</span> {item.warranty}
                  </p>
                )}
                {item.inventory !== undefined && (
                  <p className="text-sm">
                    <span className="font-semibold">Tồn kho:</span> {item.inventory}
                  </p>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {item.notes && (
                  <p className="text-sm text-muted-foreground pt-2 border-t">
                    {item.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {deal.duration && (
            <p className="mb-4">
              <span className="font-semibold">Thời hạn:</span> {deal.duration}
            </p>
          )}
          {deal.warranty && (
            <p className="mb-4">
              <span className="font-semibold">Bảo hành:</span> {deal.warranty}
            </p>
          )}
          {deal.inventory !== undefined && (
            <p className="mb-4">
              <span className="font-semibold">Tồn kho:</span> {deal.inventory}
            </p>
          )}
        </>
      )}

      {deal.notes && (
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Lưu ý</h3>
          <p className="text-sm whitespace-pre-wrap">{deal.notes}</p>
        </div>
      )}

      {/* Lead Capture CTA Button */}
      <div className="flex justify-center">
        <LeadCaptureCta variant="button" text="Đăng ký tư vấn miễn phí ngay" />
      </div>

      {/* Anti-Scam Notice */}
      <AntiScamNotice />
    </div>
  );
}
