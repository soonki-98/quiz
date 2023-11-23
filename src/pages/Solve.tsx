/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuiz } from "../apis/quiz";

// import { useQuery } from "@tanstack/react-query";

export default function Solve() {
  const [searchParams] = useSearchParams();

  const solveQueries = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((searchValue, searchKey) => {
      result[searchKey] = searchValue;
    });
    return result;
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["solve", solveQueries],
    queryFn: () => {
      const { amount, category, difficulty, type } = solveQueries;
      return getQuiz({ amount, category, difficulty, type });
    },
  });
  console.log(":::::", data?.results);
  return <div>문제풀기</div>;
}
