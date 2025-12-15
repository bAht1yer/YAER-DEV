interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
    return (
        <section
            id={id}
            className={`min-h-screen w-full flex flex-col justify-center items-center relative py-20 px-4 sm:px-6 lg:px-8 ${className}`}
        >
            <div className="max-w-7xl w-full mx-auto relative z-10">
                {children}
            </div>
        </section>
    );
}
