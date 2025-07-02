declare module "jest-axe" {
  import { AxeResults } from "axe-core";

  export function axe(container: Element | Document): Promise<AxeResults>;
  export function toHaveNoViolations(): jest.CustomMatcherResult;
  export function configureAxe(config: any): void;
}
