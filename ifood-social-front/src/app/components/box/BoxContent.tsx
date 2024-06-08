type boxContentProps = {
    children: React.ReactNode;
};

export function BoxContent({ children }: boxContentProps) {
    return (
        <div className="box border border-orange-500 py-5 px-5 shadow-l">
            {children}
        </div>
    );
}
