'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Industry = 'spa-nail' | 'bds' | 'creator' | null;

interface IndustryData {
    id: Industry;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    problems: string[];
    solutions: string[];
    ctaText: string;
    gradientClass: string;
}

/* ── SVG Icon Components (Lucide-style, 24×24) ── */
function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" /><path d="M22 5h-4" />
        </svg>
    );
}

function BuildingIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" />
            <path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" />
            <path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
        </svg>
    );
}

function VideoIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
    );
}

function XCircleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
        </svg>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
        </svg>
    );
}

const INDUSTRIES: IndustryData[] = [
    {
        id: 'spa-nail',
        icon: <SparklesIcon className="size-8" />,
        title: 'Spa / Nail',
        subtitle: 'Booking kín lịch, không rớt inbox',
        problems: [
            'Khách nhắn tin nhưng không ai trả lời kịp',
            'Quên follow-up → mất khách quen',
            'Không biết lịch trống, double-book liên tục',
        ],
        solutions: [
            'Auto-reply + booking tự động 24/7',
            'Sheet queue quản lý lịch hẹn',
            'Follow-up nhắc khách tự động',
        ],
        ctaText: 'Tôi muốn booking kín lịch',
        gradientClass: 'from-pink-500/10 to-rose-500/10 border-pink-500/30 hover:border-pink-500/60',
    },
    {
        id: 'bds',
        icon: <BuildingIcon className="size-8" />,
        title: 'Bất động sản',
        subtitle: 'Gom lead tự động, nhắc follow-up',
        problems: [
            'Lead từ nhiều nguồn, không gom được 1 chỗ',
            'Quên gọi lại → đối thủ chốt trước',
            'Không có báo cáo, không biết hiệu quả',
        ],
        solutions: [
            'Lead sheet gom từ mọi kênh',
            'Nhắc gọi lại tự động theo lịch',
            'Báo cáo 2 lần/ngày, biết ngay hiệu quả',
        ],
        ctaText: 'Tôi muốn gom lead không rớt',
        gradientClass: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:border-blue-500/60',
    },
    {
        id: 'creator',
        icon: <VideoIcon className="size-8" />,
        title: 'Creator / KOL',
        subtitle: 'Pipeline 30 phút/ngày, đăng đều đặn',
        problems: [
            'Viết content mất cả ngày, không có thời gian quay',
            'Đăng thiếu nhất quán, engagement giảm',
            'Không có hệ thống duyệt → chậm trễ',
        ],
        solutions: [
            'Viết → ảnh → duyệt → đăng tự động',
            'Lịch đăng 7 ngày sẵn sàng',
            'Pipeline 30 phút/ngày là xong',
        ],
        ctaText: 'Tôi muốn đăng bài đều đặn',
        gradientClass: 'from-violet-500/10 to-purple-500/10 border-violet-500/30 hover:border-violet-500/60',
    },
];

const FORM_URL = process.env.NEXT_PUBLIC_INTAKE_URL || '#';

export function IndustrySelector() {
    const [selected, setSelected] = useState<Industry>(null);

    const handleSelect = (id: Industry) => {
        setSelected(id);
        setTimeout(() => {
            document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    const selectedData = INDUSTRIES.find((i) => i.id === selected);

    return (
        <div className="space-y-10">
            {/* Industry Cards — 44px min touch target, cursor-pointer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {INDUSTRIES.map((industry) => (
                    <button
                        key={industry.id as string}
                        onClick={() => handleSelect(industry.id)}
                        className="text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                        aria-label={`Chọn ngành ${industry.title}`}
                    >
                        <Card
                            className={cn(
                                'h-full border-2 bg-gradient-to-br',
                                'transition-all duration-200 ease-in-out',
                                industry.gradientClass,
                                selected === industry.id && 'ring-2 ring-primary shadow-lg scale-[1.02]',
                                selected && selected !== industry.id && 'opacity-50'
                            )}
                        >
                            <CardHeader className="pb-3">
                                <div className="mb-2 text-primary">{industry.icon}</div>
                                <CardTitle className="text-xl">{industry.title}</CardTitle>
                                <p className="text-sm font-medium text-primary">{industry.subtitle}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Problems */}
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                        Vấn đề bạn gặp
                                    </p>
                                    <ul className="space-y-1.5">
                                        {industry.problems.map((p, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex gap-2 items-start">
                                                <XCircleIcon className="size-4 shrink-0 text-destructive mt-0.5" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Solutions */}
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                        Giải pháp
                                    </p>
                                    <ul className="space-y-1.5">
                                        {industry.solutions.map((s, i) => (
                                            <li key={i} className="text-sm font-medium flex gap-2 items-start">
                                                <CheckCircleIcon className="size-4 shrink-0 text-primary mt-0.5" />
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA badge — min 44px height for touch */}
                                <Badge
                                    variant={selected === industry.id ? 'default' : 'outline'}
                                    className="w-full justify-center py-2.5 text-sm min-h-[44px]"
                                >
                                    {industry.ctaText}
                                </Badge>
                            </CardContent>
                        </Card>
                    </button>
                ))}
            </div>

            {/* Embedded Form Section */}
            <div id="intake-form" className="scroll-mt-8">
                {selected ? (
                    <Card className="border-2 border-primary/20 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="text-primary">{selectedData?.icon}</div>
                                <div>
                                    <CardTitle>Đăng ký tư vấn — {selectedData?.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedData?.subtitle}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            {/* Primary CTA - Google Form */}
                            <a
                                href={FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'inline-flex items-center justify-center gap-2 rounded-md w-full',
                                    'bg-primary text-primary-foreground px-6 py-4 text-base font-semibold',
                                    'transition-colors duration-200 hover:bg-primary/90',
                                    'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[52px]'
                                )}
                                aria-label="Mở form đăng ký trong tab mới"
                            >
                                <svg
                                    className="size-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                Điền form 2 phút
                            </a>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Hoặc liên hệ trực tiếp
                                    </span>
                                </div>
                            </div>

                            {/* Backup CTAs - Zalo & Hotline */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://zalo.me/g/uwawns336"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'flex-1 inline-flex items-center justify-center gap-2 rounded-md',
                                        'border border-input bg-background px-4 py-3 text-sm font-medium min-h-[44px]',
                                        'transition-colors duration-200 hover:bg-accent hover:text-accent-foreground',
                                        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                    )}
                                    aria-label="Tham gia nhóm Zalo"
                                >
                                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.739 4.304 1.986 5.973L2.05 21.95l4.022-1.935A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                                    </svg>
                                    Nhóm Zalo
                                </a>
                                <a
                                    href="tel:0903469888"
                                    className={cn(
                                        'flex-1 inline-flex items-center justify-center gap-2 rounded-md',
                                        'border border-input bg-background px-4 py-3 text-sm font-medium min-h-[44px]',
                                        'transition-colors duration-200 hover:bg-accent hover:text-accent-foreground',
                                        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                    )}
                                    aria-label="Gọi tư vấn qua Zalo"
                                >
                                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    Gọi: 0903 469 888
                                </a>
                            </div>

                            {/* Benefits */}
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
                ) : (
                    <div className="text-center py-16 rounded-lg border-2 border-dashed border-muted-foreground/20">
                        <svg className="size-10 mx-auto mb-3 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                        <p className="text-lg text-muted-foreground">
                            Chọn ngành của bạn ở trên để bắt đầu đăng ký
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
