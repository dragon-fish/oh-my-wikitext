import { EventContext } from '@cloudflare/workers-types'

interface Env {
  MW_API_ENDPOINT: string
  MW_ARTICLE_PATH: string
}

export const onRequest = async (
  ctx: EventContext<Env, any, any>
): Promise<Response> => {
  const request = ctx.request

  const url = new URL(request.url)
  url.host = 'zh.moegirl.org.cn'
  url.protocol = 'https:'
  url.port = ''

  const proxy = new Request(url, request as any)
  return fetch(proxy)
}
