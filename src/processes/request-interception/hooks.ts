import intercept from 'fetch-intercept'
import {
  createUrlMatchers,
  Pathfinder
} from '@kode-frontend/pathfinder-web-core'
import { useEffect } from 'react'

export function useRequestInterception(
  pathfinder: Pathfinder,
  active: boolean
) {
  // fetch
  useEffect(() => {
    if (!active) {
      return
    }

    const unregister = intercept.register({
      request(url: string, config: any): Promise<any[]> | any[] {
        const spec = pathfinder.getSpec()

        const matchers = spec?.urls ? createUrlMatchers(spec.urls) : null

        const envSpecs = spec?.envs

        const method = config?.method || 'GET'
        const newUrl = matchers
          ? pathfinder.buildUrl({ matchers, method, url, envSpecs })
          : url
        return [newUrl, config]
      }
    })

    return () => {
      unregister()
    }
  }, [pathfinder, active])

  // XMLHttpRequest
  useEffect(() => {
    if (!active) {
      return
    }
    const open = XMLHttpRequest.prototype.open

    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL
    ) {
      const urlString = typeof url === 'string' ? url : url.toString()

      const spec = pathfinder.getSpec()

      const envSpecs = spec?.envs

      const matchers = spec?.urls ? createUrlMatchers(spec.urls) : null

      const newUrl = matchers
        ? pathfinder.buildUrl({
            matchers,
            method,
            url: urlString,
            envSpecs
          })
        : urlString

      arguments[1] = newUrl
      open.apply(this, arguments as any)
    }

    return () => {
      XMLHttpRequest.prototype.open = open
    }
  }, [pathfinder, active])
}
