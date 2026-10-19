export function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (url.hostname.endsWith('.pages.dev')) {
    return Response.redirect(`https://www.yuuvi.cat${url.pathname}${url.search}`, 301);
  }

  return context.next();
}
