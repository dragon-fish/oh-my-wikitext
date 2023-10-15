import { EventContext } from '@cloudflare/workers-types'

interface Env {
  MW_API_ENDPOINT: string
  MW_ARTICLE_PATH: string
}

export const onRequest = async (
  ctx: EventContext<Env, any, any>
): Promise<Response> => {
  const request = ctx.request

  const endpointURL = new URL(ctx.env.MW_API_ENDPOINT)
  const requestURL = new URL(request.url)

  endpointURL.search = requestURL.search

  const proxy = new Request(endpointURL, request as any)
  return fetch(proxy)
}
