/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface defaultProps {
  /**
   * example parameter
   * @default ""
   */
  icon?: string;
}

export default class extends SvelteComponentTyped<defaultProps, {}, {}> {
  /**
   * Get information about component
   */
  getInfo: () => any;

  /**
   * version of component
   */
  version: string;
}
