export function onRequest(ctx: { request: Request }): Promise<Response> {
  const { request } = ctx

  const url = new URL(request.url)
  url.host = 'zh.moegirl.org.cn'
  url.protocol = 'https:'
  url.port = ''

  const proxy = new Request(url, request)
  return fetch(proxy)
}
