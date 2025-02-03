import "@testing-library/jest-dom";

// import { JSDOM } from "jsdom";

// const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
// global.document = dom.window.document;
// (global.window as any) = dom.window;
// global.Node = dom.window.Node;

class SVGImageElement extends HTMLImageElement {
  constructor() {
    super();
  }
}

(global.SVGImageElement as any) = SVGImageElement;
