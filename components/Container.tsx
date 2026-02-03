import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-7xl px-6 2xl:max-w-[1480px] ${className ?? ""}`}>{children}</div>;
}
