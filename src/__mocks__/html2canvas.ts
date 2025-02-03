export default jest.fn(() =>
  Promise.resolve({
    toDataURL: () => "data:image/jpeg;base64,mockImageData",
  }),
);
