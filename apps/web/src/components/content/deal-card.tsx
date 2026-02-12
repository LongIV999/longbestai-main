import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Deal } from '@longbestai/shared';

export function DealCard({ deal }: { deal: Deal }) {
  const priceDisplay = typeof deal.price === 'number'
    ? `${deal.price.toLocaleString('vi-VN')}đ`
    : deal.price;

  return (
    <Link href={`/deals/${deal.slug}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{deal.title}</CardTitle>
          <CardDescription className="text-xl font-semibold text-primary">
            {priceDisplay}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {deal.items && deal.items.length > 0 && (
            <p className="text-muted-foreground mb-4">
              {deal.items.length} tùy chọn có sẵn
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {deal.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
