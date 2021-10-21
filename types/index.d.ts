declare type RefType<T> = T | null;

declare type EmitType = (event: string, ...args: any[]) => void;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
