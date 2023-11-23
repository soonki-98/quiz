import { instance } from "./instance";

type Quiz = {
  category: string;
  correct_answer: string;
  difficulty: "easy" | "medium" | "hard";
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
};

export const getCategories = async () => {
  const result = await instance.get<{
    trivia_categories: { id: number; name: string }[];
  }>("/api_category.php");
  return result.data;
};

export const getQuiz = async ({
  amount,
  category,
  difficulty,
  type,
}: {
  amount: string;
  category: string;
  difficulty: string;
  type: string;
}) => {
  let path = `?amount=${amount}`;
  if (category && category !== "any") {
    path += `&category=${category}`;
  }
  if (difficulty && difficulty !== "any") {
    path += `&difficulty=${difficulty}`;
  }
  if (type && type !== "any") {
    path += `&type=${type}`;
  }
  const result = await instance.get<{ response_code: number; results: Quiz[] }>(
    `api.php${path}`
  );
  return result.data;
};
