export const BRAND = {
  colors: {
    primary: '#00F0F0',
    lime: '#B6FF00'
  },
  contact: {
    zalo: '0903 469 888',
    groupLink: 'https://zalo.me/g/uwawns336'
  }
} as const;

export const CTA_TEMPLATES = {
  generic: (keyword: string) =>
    `Liên hệ ${keyword} qua Zalo ${BRAND.contact.zalo} hoặc tham gia nhóm ${BRAND.contact.groupLink}`,

  deal: (name: string) =>
    `Đặt hàng ${name} ngay! Zalo ${BRAND.contact.zalo} hoặc tham gia nhóm ${BRAND.contact.groupLink}`,

  course: (name: string) =>
    `Đăng ký ${name} - Zalo ${BRAND.contact.zalo} hoặc tham gia nhóm ${BRAND.contact.groupLink}`
} as const;
