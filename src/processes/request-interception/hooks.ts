import intercept from 'fetch-intercept';
import {
  createUrlMatchers,
  Pathfinder,
} from '@kode-frontend/pathfinder-web-core';
import { useEffect } from 'react';
import { Header } from '@kode-frontend/pathfinder-web-core/dist/types';

export function useRequestInterception(
  pathfinder: Pathfinder,
  active: boolean
) {
  // fetch
  useEffect(() => {
    if (!active) {
      return;
    }

    const unregister = intercept.register({
      request(
        url: string,
        config: RequestInit | undefined
      ): Promise<any[]> | any[] {
        const spec = pathfinder.getSpec();

        const matchers = spec?.urls ? createUrlMatchers(spec.urls) : null;
        const method = config?.method || 'GET';

        const endpointSpec = matchers
          ? pathfinder.findSpec(matchers, method, url)
          : null;

        let endpointHeaders: Header[] = [];

        if (endpointSpec) {
          endpointHeaders = pathfinder.getEndpointHeaders(endpointSpec.id);
        }

        const globalHeaders = pathfinder.getGlobalHeaders();

        if (config?.headers && globalHeaders.length > 0) {
          const newHEaders = globalHeaders.reduce((acc, current) => {
            const endpointHeader = endpointHeaders.find(
              (h) => h.key === current.key
            );

            const headerValue = endpointHeader || current.value;

            return { ...acc, [current.key]: headerValue };
          }, {});

          config.headers = { ...config.headers, ...newHEaders };
        }

        const envSpecs = spec?.envs;

        const newUrl = matchers
          ? pathfinder.buildUrl({ matchers, method, url, envSpecs })
          : url;
        return [newUrl, config];
      },
    });

    return () => {
      unregister();
    };
  }, [pathfinder, active]);

  // XMLHttpRequest

  /**
   * TODO: Implement headers handling as in `fetch`
   */
  useEffect(() => {
    if (!active) {
      return;
    }
    const open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL
    ) {
      const urlString = typeof url === 'string' ? url : url.toString();
      const spec = pathfinder.getSpec();
      const envSpecs = spec?.envs;
      const matchers = spec?.urls ? createUrlMatchers(spec.urls) : null;

      const newUrl = matchers
        ? pathfinder.buildUrl({
            matchers,
            method,
            url: urlString,
            envSpecs,
          })
        : urlString;

      arguments[1] = newUrl;
      open.apply(this, arguments as any);
    };

    return () => {
      XMLHttpRequest.prototype.open = open;
    };
  }, [pathfinder, active]);
}
