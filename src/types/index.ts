import type {   JSX, ReactNode  } from "react";

export type TRole = "ADMIN" | "USER" | "AGENT" ;

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    Component: () => ReactNode | JSX.Element;
  }[];
}
