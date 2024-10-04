const Section = (props) => {
    const { children } = props;
    return (
        <section className="h-screen w-screen  max-w-screen mx-auto flex flex-col items-start pt-32 text-white"> {/* Center items for better layout */}
            {children}
        </section>
    );
}

export const Interface = () => {
    return (
        <>
            <Section>
                <div className="flex items-center w-full justify-center">
                <h1 className="text-6xl font-thin">Let's Begin Our Journey</h1>
                </div>
                
            </Section>
            
        </>
    );
}
