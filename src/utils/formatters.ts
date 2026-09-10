export function formatCurrency(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    const val = amount / 1_000_000_000;
    return `Rp ${val % 1 === 0 ? val : val.toFixed(1)}M`;
  }
  if (amount >= 1_000_000) {
    const val = amount / 1_000_000;
    return `Rp ${val % 1 === 0 ? val : val.toFixed(1)}jt`;
  }
  if (amount >= 1_000) {
    const val = amount / 1_000;
    return `Rp ${val % 1 === 0 ? val : val.toFixed(1)}rb`;
  }
  return formatCurrency(amount);
}

export function parseIndonesianCurrency(str: string): number {
  const clean = str.replace(/[^\d]/g, '');
  return parseInt(clean, 10) || 0;
}
