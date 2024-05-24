import { ReactNode } from "react";

type BoxHeaderProps = {
    children: ReactNode;
};

export function BoxHeader({ children }: BoxHeaderProps) {
    return (
        <div className="flex justify-start">
            {children}
        </div>
    );
}
