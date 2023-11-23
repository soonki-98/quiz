import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { createMemoryHistory, MemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

describe("Solve Page", () => {
  it("renders correctly", async () => {
    const history = createMemoryHistory({ initialEntries: ["/solve"] });
    renderWithRouter({ history });
    expect(await screen.findByTestId("solve-page")).toBeInTheDocument();
  });

  it("select answer", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/solve?amount=10"],
    });
    renderWithRouter({ history });
    const radio = await screen.getByTestId("select-answer");
    await userEvent.click(radio);
    await screen.getByTestId("select-answer");
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
