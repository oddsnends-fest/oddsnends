import { renderHook, act } from "@testing-library/react";
import useShareToInstagram from "@/hooks/useShareToInstagram";
import { toJpeg } from "html-to-image";

// Mock window.getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

// Mock external libraries
jest.mock("html-to-image");
jest.mock("html2canvas");

describe("useShareToInstagram", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const { result } = renderHook(() => useShareToInstagram());
  it("should handle downloading the card as an image", async () => {
    const mockCardRef = { current: document.createElement("div") };
    mockCardRef.current.innerHTML = "<p>Mock content</p>"; // Add content to the element
    mockCardRef.current.style.width = "100px"; // Add styles if needed
    mockCardRef.current.style.height = "100px";

    // Mock document.createElement to return an HTMLAnchorElement
    const mockLink: HTMLAnchorElement = {
      href: "",
      download: "",
      click: jest.fn(),
    } as unknown as HTMLAnchorElement;

    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === "a") {
        return mockLink;
      }
      return document.createElement(tagName); // Fallback for other tags
    });

    await act(async () => {
      await result.current.handleDownloadFile(mockCardRef);
    });

    expect(mockLink.href).toBe("data:image/jpeg;base64,mockImageData");
    expect(mockLink.download).toBe("image-mock.jpg");
    expect(mockLink.click).toHaveBeenCalled();
  });

  it("should handle converting the card to an image and updating the URL", async () => {
    const mockedImageDataUrl = "data:image/jpeg;base64,mockImageData";

    (toJpeg as jest.Mock).mockReturnValue(mockedImageDataUrl);

    const mockCardRef: { current: HTMLDivElement } = {
      current: document.createElement("div"),
    };
    mockCardRef.current.innerHTML = "<p>Mock content</p>"; // Add content to the element

    // console.log(mockCardRef, "mockCardRef");

    const mockAddStep = jest.fn();

    await act(async () => {
      await result.current.handleRouteToSharePage(mockCardRef, mockAddStep);
    });

    expect(toJpeg).toHaveBeenCalledWith(mockCardRef.current, { quality: 1 });
    expect(result.current.urlImage).toBe(
      "data:image/jpeg;base64,mockImageData",
    );
    expect(mockAddStep).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should handle sharing the image", async () => {
    const mockUrlImage = "data:image/jpeg;base64,mockImageData";
    result.current.urlImage = mockUrlImage;

    // console.log("urlImage before handleShare:", result.current.urlImage); // Debugging line

    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        blob: () => Promise.resolve(new Blob()),
      }),
    );

    global.navigator.share = jest.fn(() => Promise.resolve());

    await act(async () => {
      await result.current.handleShare();
    });

    // console.log(mockUrlImage, "urlImage");

    // console.log("fetch calls:", (global.fetch as jest.Mock).mock.calls); // Debugging line

    expect(global.fetch).toHaveBeenCalledWith(mockUrlImage);
  });
});
