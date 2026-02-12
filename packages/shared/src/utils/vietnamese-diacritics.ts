/**
 * Vietnamese diacritics mapping for slug generation
 * Maps accented characters to their base ASCII equivalents
 */
export const VIETNAMESE_DIACRITICS_MAP: Record<string, string> = {
  // Vowel a
  'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',

  // Vowel e
  'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',

  // Vowel i
  'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',

  // Vowel o
  'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',

  // Vowel u
  'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',

  // Vowel y
  'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',

  // Consonant d
  'đ': 'd', 'Đ': 'd'
};

/**
 * Remove Vietnamese diacritics from a string
 * Example: "Giới thiệu OpenClaw" → "Gioi thieu OpenClaw"
 */
export function removeDiacritics(str: string): string {
  return str
    .split('')
    .map(char => VIETNAMESE_DIACRITICS_MAP[char] || char)
    .join('');
}
