import axios from "axios";
import { IAnimal } from "../models/IAnimal";

export const fetchAnimals = async (): Promise<IAnimal[]> => {
  try {
    const response = await axios.get<IAnimal[]>(
      "https://animals.azurewebsites.net/api/animals"
    );
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error();
  }
};
