import { getAllDeals } from '@/lib/content/deals';
import { DealCard } from '@/components/content/deal-card';

export const metadata = {
  title: 'Deals & Pricing - LongBestAI',
  description: 'Bảng giá các sản phẩm và dịch vụ AI automation'
};

export default async function DealsPage() {
  const deals = getAllDeals();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Deals & Pricing</h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Khám phá các gói sản phẩm và dịch vụ của chúng tôi
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map(deal => (
          <DealCard key={deal.slug} deal={deal} />
        ))}
      </div>

      {deals.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Chưa có deals nào.
        </p>
      )}
    </div>
  );
}
