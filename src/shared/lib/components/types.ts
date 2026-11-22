export interface ComponentProps {
  children?: string;
}


export type Component<P = Record<string, never>> = (
  props?: P & ComponentProps,
) => string;
