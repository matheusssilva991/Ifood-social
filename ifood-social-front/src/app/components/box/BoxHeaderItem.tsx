import { ReactNode } from "react";

type BoxHeaderProps = {
    children: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    isDisabled?: boolean;
};

export function BoxHeaderItem({ children, isActive, onClick, isDisabled }: BoxHeaderProps) {
    const activeClass = isActive ? "bg-orange-500 text-white" : "bg-slate-200";

    return (
        <button onClick={onClick} disabled={isDisabled}
        className={"flex justify-center align-middle rounded-t-2xl px-6 py-1 " + activeClass}>
            {children}
        </button>
    );
}
