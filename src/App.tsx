import { useEffect, useState } from "react";
import "./App.css";
import { fetchAnimals } from "./services/animalservices";
import { IAnimal } from "./models/IAnimal";

function App() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  useEffect(() => {
    const getAnimalData = async () => {
      const response = await fetchAnimals();
      setAnimals(response);
    };
    getAnimalData();
  }, []);

  return (
    <>
      <div>
        {animals.map((animal: IAnimal) => {
          return (
            <div key={animal.id}>
              <p>{animal.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default App;
