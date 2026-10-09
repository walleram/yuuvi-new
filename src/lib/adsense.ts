// Configuración de Google AdSense (Auto Ads).
// AdSense coloca solo los bloques en la página, así que aquí únicamente se
// guarda el ID de editor y la URL del script. No hay slots manuales.
// clientId: https://www.google.com/adsense/ → Configuración → Cuenta → ID del editor (ca-pub-XXXXXXXXXXXX)

export const ADSENSE = {
  clientId: 'ca-pub-7001158068581267',
  // Activar solo cuando clientId sea real
  get enabled() {
    return this.clientId !== 'ca-pub-0000000000000000' && this.clientId !== '';
  },
};

export function adsenseScriptSrc(): string {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.clientId}`;
}
