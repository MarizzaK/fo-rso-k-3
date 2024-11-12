import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { IAnimal } from "../models/IAnimal";
import "../CSS/AnimalInfo.css";

const AnimalInfo: React.FC = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const [animal, setAnimal] = useState<IAnimal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [fed, setFed] = useState<string>("Inte matad än");

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await Axios.get<IAnimal>(
          `https://animals.azurewebsites.net/api/animals/${animalId}`
        );
        const fetchedAnimal = response.data;
        setAnimal(fetchedAnimal);

        const now = new Date();
        const storedLastFed = localStorage.getItem(
          `animal-${animalId}-lastFed`
        );
        const storedNextAvailable = localStorage.getItem(
          `animal-${animalId}-nextAvailable`
        );

        if (storedLastFed) {
          const lastFedDate = new Date(storedLastFed);

          if (storedNextAvailable) {
            const nextAvailableDate = new Date(storedNextAvailable);
            if (now < nextAvailableDate) {
              setFed(
                `Senast matad: ${lastFedDate.toLocaleDateString()} ${lastFedDate.toLocaleTimeString()}`
              );
              setButtonDisabled(true);
            } else {
              setFed("Inte matad än");
              setButtonDisabled(false);
            }
          } else {
            setFed(
              `Senast matad: ${lastFedDate.toLocaleDateString()} ${lastFedDate.toLocaleTimeString()}`
            );
            setButtonDisabled(false);
          }
        } else {
          setFed("Inte matad än");
          setButtonDisabled(false);
        }

        setLoading(false);
      } catch (err) {
        setError("Kunde inte hämta djurdata");
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [animalId]);

  const updateFed = () => {
    if (animal) {
      const now = new Date();
      setAnimal((prev) => (prev ? { ...prev, lastFed: now } : null));
      localStorage.setItem(`animal-${animalId}-lastFed`, now.toISOString());
      const nextAvailable = new Date(now.getTime() + 3 * 60 * 60 * 1000);

      localStorage.setItem(
        `animal-${animalId}-nextAvailable`,
        nextAvailable.toISOString()
      );
      setFed(
        `Senast matad: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
      );
      setButtonDisabled(true);
    }
  };

  if (loading) {
    return <p>Hämtar data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!animal) {
    return <p>Inget djur hittades</p>;
  }

  return (
    <div className="animal-info-container">
      <h2>{animal.name}</h2>
      <img className="animalInfo-img" src={animal.imageUrl} alt={animal.name} />
      <p>
        <strong>Tilltalsnamn:</strong> {animal.latinName}
      </p>
      <p>
        <strong>Födelseår:</strong> {animal.yearOfBirth}
      </p>
      <p className="longText">
        <strong>Om {animal.name}:</strong> {animal.longDescription}
      </p>

      <p>{fed}</p>

      <button onClick={updateFed} disabled={buttonDisabled}>
        Mata mig!
      </button>
    </div>
  );
};

export default AnimalInfo;
