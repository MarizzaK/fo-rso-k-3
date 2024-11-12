import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAnimals } from "../services/animalservices";
import { IAnimal } from "../models/IAnimal";
import "../CSS/AnimalPage.css";

const AnimalPage: React.FC = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    const getAnimalData = async () => {
      try {
        const response = await fetchAnimals();
        const updatedAnimals: IAnimal[] = response.map((animal) => {
          const lastFed = localStorage.getItem(`animal-${animal.id}-lastFed`);
          if (lastFed) {
            return {
              ...animal,
              lastFed: new Date(lastFed),
            };
          }
          return animal;
        });
        setAnimals(updatedAnimals);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    getAnimalData();
  }, []);

  return (
    <div className="animal-page">
      <h1>Här kan du se en lista över djuren</h1>
      <div className="animal-list">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <div key={animal.id} className="animal-item">
              <h2>{animal.name}</h2>
              <img src={animal.imageUrl} alt={animal.name} />
              <p>
                <strong>Namn:</strong> {animal.latinName}
              </p>
              <p>
                <strong>Beskrivning:</strong> {animal.shortDescription}
              </p>
              <p>
                <strong>Senast matad:</strong>{" "}
                {animal.lastFed
                  ? new Date(animal.lastFed).toLocaleString()
                  : "Ej matad ännu"}
              </p>
              <Link to={`/animal/${animal.id}`}>Se mer</Link>
            </div>
          ))
        ) : (
          <p>Laddar sidan...</p>
        )}
      </div>
    </div>
  );
};

export default AnimalPage;
