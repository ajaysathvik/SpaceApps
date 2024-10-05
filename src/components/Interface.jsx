import { TiMediaRecord } from "react-icons/ti";
const Section = (props) => {
    const { children } = props;
    return (
        <section className="h-screen w-screen  max-w-screen mx-auto flex flex-col items-start text-white"> {/* Center items for better layout */}
            {children}
        </section>
    );
}

export const Interface = () => {
    const myArray = [
        "Sun",
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupyter",
        "Saturn",
        "Uranus",
        "Neptune",
        
      ];
      const myList = myArray.map((item) => (
        <div className="group pl-10 flex flex-col justify-center items-center transition duration-300">
          <TiMediaRecord className="text-4xl group-hover:text-6xl transition duration-300" />
          <p className="text-lg group-hover:text-2xl transition duration-300">{item}</p>
        </div>
      ));
    return (
        <>
        <Section> 
            <div className="flex flex-row w-full justify-center pt-10">
                {myList}
            </div>
            </Section>
           
            <Section>
                <div className="flex items-center w-full justify-center">
                <h1 className="text-6xl font-thin">Let's Begin Our Journey</h1>
                </div>
                
            </Section>
            
        </>
    );
}
