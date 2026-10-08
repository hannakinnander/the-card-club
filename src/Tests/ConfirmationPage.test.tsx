import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import ConfirmationPage from "../components/ConfirmationPage/ConfirmationPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("ConfirmationPage", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Hämtar order med id från URL:en", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      json: async () => ({}),
    } as Response);

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/confirmation/123"]}>
          <Routes>
            <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/orders/123",
    );
  });
});
