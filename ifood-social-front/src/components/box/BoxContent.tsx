type boxContentProps = {
    children: React.ReactNode;
};

export function BoxContent({ children }: boxContentProps) {
    return (
        <div className="box border border-orange-400 p-4 shadow-l">
            {children}
        </div>
    );
}
