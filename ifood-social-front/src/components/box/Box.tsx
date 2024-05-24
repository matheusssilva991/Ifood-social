type boxProps = {
    children: React.ReactNode;
};

export function Box({ children }: boxProps) {
    return (
        <div className="container mx-auto mt-10 w-9/12 mb-20">
            {children}
        </div>
    );
}
