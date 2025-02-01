import {
  render,
  screen,
  renderHook,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ShareToInstagram from "@/components/CardAndSharewithDownload";
import useShareToInstagram from "@/hooks/useShareToInstagram";

describe("ShareToInstagram", () => {
  const { result } = renderHook(() => useShareToInstagram());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the card component and buttons", async () => {
    render(<ShareToInstagram />);
    await waitFor(() => {
      expect(
        screen.getByText("Noteworthy technology acquisitions 2021"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("download")).toBeInTheDocument();
      expect(screen.getByTestId("share")).toBeInTheDocument();
    });
  });

  it("should call handleDownloadFile when the download button is clicked", async () => {
    render(<ShareToInstagram />);
    const mockHandleDownloadFile = jest
      .fn()
      .mockReturnValue(result.current.handleDownloadFile);
    jest
      .spyOn(result.current, "handleDownloadFile")
      .mockImplementation(mockHandleDownloadFile);

    await waitFor(() => {
      const downloadButton = screen.getByTestId("download");
      fireEvent.click(screen.getByTestId("download"));
      console.log(downloadButton, "button download");
      expect(result.current.handleDownloadFile).toHaveBeenCalled();
    });
  });
});
