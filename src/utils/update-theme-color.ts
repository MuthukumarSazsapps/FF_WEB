export function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `${r} ${g} ${b}`;
}

export function updateThemeColor(
  primaryLighter: string,
  primaryLight: string,
  primaryDefault: string,
  primaryDark: string,
) {
  document.documentElement.style.setProperty('--primary-dark', hexToRGB(primaryDark));
  document.documentElement.style.setProperty('--primary-light', hexToRGB(primaryLight));
  document.documentElement.style.setProperty('--primary-lighter', hexToRGB(primaryLighter));
  document.documentElement.style.setProperty('--primary-default', hexToRGB(primaryDefault));
}
