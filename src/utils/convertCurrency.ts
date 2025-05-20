

/**
 * Converte um valor monetário de reais (BRL) para centavos.
 * @param {string} amount - O valor monetário em reais (ex: '1.3050,50').
 * @returns {number} O valor convertido em centavos (ex: 1305050).
 */
export function convertRealtoCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, '').replace(",", '.'));

  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents

}