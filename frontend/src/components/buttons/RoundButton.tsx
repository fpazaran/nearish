import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function RoundButton({ children, onClick }: Props) {
  return (
    <button
      className="bg-[var(--lightest_pink)] px-6 py-2 rounded-full flex flex-row items-center gap-2 shadow-lg/5 min-w-58"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
