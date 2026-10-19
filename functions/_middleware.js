const CANONICAL_ORIGIN = 'https://www.yuuvi.cat';

export function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const host = url.hostname;

  if (host.endsWith('.pages.dev') || host === 'yuuvi.cat') {
    return Response.redirect(`${CANONICAL_ORIGIN}${url.pathname}${url.search}`, 301);
  }

  return context.next();
}
