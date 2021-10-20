declare global {
  declare type Recordable<T = any> = Record<string, T>
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
