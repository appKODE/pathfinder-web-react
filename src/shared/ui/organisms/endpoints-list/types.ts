import { UrlMethod } from '@kode-frontend/pathfinder-web-core';

export type TUrlItem = {
  id: string;
  method: UrlMethod;
  template: string;
  name: string;
};
