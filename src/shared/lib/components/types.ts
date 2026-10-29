export type Component<P = object> = (
  props: P & { children?: Component[] },
) => string;
