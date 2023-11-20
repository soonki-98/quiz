import { instance } from "./instance";

export const getCategories = async () => {
  const result = await instance.get<{
    trivia_categories: { id: number; name: string }[];
  }>("/api_category.php");
  return result.data;
};
