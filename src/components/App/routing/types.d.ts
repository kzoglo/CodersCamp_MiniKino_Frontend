import { ComponentClass, FC } from 'react';

export interface IRoutingData {
  path: string;
  component: ComponentClass | FC;
}

export interface IRoutingList extends IRoutingData {
  exact: boolean;
}
