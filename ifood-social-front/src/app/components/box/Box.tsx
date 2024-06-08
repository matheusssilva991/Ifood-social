type boxProps = {
    children: React.ReactNode;
};

export function Box({ children }: boxProps) {
    return (
        <div className="container mx-auto mt-10 w-fit mb-15">
            {children}
        </div>
    );
}
