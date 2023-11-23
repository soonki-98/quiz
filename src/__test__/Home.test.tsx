import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { createMemoryHistory, MemoryHistory } from "history";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

describe("Home Component", () => {
  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByTestId("solve-quiz")).toBeInTheDocument();
  });

  it("navigates to 'solve' on form submit", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    renderWithRouter({ history });

    // "Solve Quiz" 버튼 클릭
    const solveQuizButton = await screen.findByRole("button", {
      name: /Solve Quiz/,
    });
    await userEvent.click(solveQuizButton);

    expect(history.location.pathname).toBe("/solve");
  });
  function renderWithRouter({ history }: { history: MemoryHistory }) {
    return render(
      <Router location={history.location} navigator={history}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Router>
    );
  }
});
