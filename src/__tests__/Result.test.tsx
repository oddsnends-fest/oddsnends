// test the download
// test the share button
// test the share to instagram
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ShareToInstagram from "@/components/CardAndSharewithDownload";
import userEvent from "@testing-library/user-event";

describe("Download", () => {
  it("should download the image", async () => {
    render(<ShareToInstagram />);
    const downloadButton = screen.getByTestId("download");
    await userEvent.click(downloadButton);
    expect(downloadButton).toBeInTheDocument();
  });
});
