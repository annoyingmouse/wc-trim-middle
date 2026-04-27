class WCTrimMiddle extends HTMLSpanElement {
  #originalText = null;
  #observer = null;

  static get observedAttributes() {
    return ["width", "replacement"];
  }

  connectedCallback() {
    this.#originalText = this.textContent;
    if (this.#originalText.length > this.width) {
      this.textContent = this.trimMiddle(
        this.#originalText,
        this.width,
        this.replacement,
      );
      this.setAttribute("title", this.#originalText);
      this.setAttribute("aria-label", this.#originalText);
    }
    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (
            this.textContent !== this.#originalText &&
            this.textContent !==
              this.trimMiddle(this.#originalText, this.width, this.replacement)
          ) {
            this.#originalText = this.textContent;
            if (this.#originalText.length > this.width) {
              this.textContent = this.trimMiddle(
                this.#originalText,
                this.width,
                this.replacement,
              );
              this.setAttribute("title", this.#originalText);
              this.setAttribute("aria-label", this.#originalText);
            } else {
              this.textContent = this.#originalText;
              this.removeAttribute("title");
              this.removeAttribute("aria-label");
            }
          }
        }
      });
    });
    this.#observer.observe(this, {
      attributes: false,
      childList: true,
      characterData: false,
    });
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "width" && this.#originalText) {
        if (this.#originalText.length > newValue) {
          this.textContent = this.trimMiddle(
            this.#originalText,
            this.width,
            this.replacement,
          );
          this.setAttribute("title", this.#originalText);
          this.setAttribute("aria-label", this.#originalText);
        } else {
          this.textContent = this.#originalText;
          this.removeAttribute("title");
          this.removeAttribute("aria-label");
        }
      }
      if (name === "replacement" && this.#originalText) {
        if (this.#originalText.length > this.width) {
          this.textContent = this.trimMiddle(
            this.#originalText,
            this.width,
            this.replacement,
          );
          this.setAttribute("title", this.#originalText);
          this.setAttribute("aria-label", this.#originalText);
        } else {
          this.textContent = this.#originalText;
          this.removeAttribute("title");
          this.removeAttribute("aria-label");
        }
      }
    }
  }

  /**
   * Shamelessly stolen from Chris Heilmann
   * https://github.com/codepo8/trimMiddle
   * @param str
   * @param length
   * @param replaceString
   * @returns {string}
   */
  trimMiddle = (str, length = 16, replaceString = "…") => {
    if (typeof str !== "string") {
      throw new TypeError("The first argument must be a string.");
    }
    if (typeof length !== "number") {
      throw new TypeError("The length argument must be a number.");
    }
    if (typeof replaceString !== "string") {
      throw new TypeError("The replaceString argument must be a string.");
    }
    if (length <= replaceString.length) {
      throw new RangeError(
        "The length argument must be greater than the replaceString length.",
      );
    }

    if (str.length <= length) {
      return str;
    }

    let res = "";
    const remainder = (length - replaceString.length) / 2;
    const head = Math.ceil(remainder);
    const tail = [];
    let i = 0;
    for (const { segment } of new Intl.Segmenter().segment(str)) {
      if (i < head) {
        res += segment;
      } else {
        tail.push(segment);
      }
      i++;
    }
    const end = Math.floor(remainder);
    return res + replaceString + (end > 0 ? tail.slice(-end).join("") : "");
  };

  get width() {
    return this.hasAttribute("width") &&
      !Number.isNaN(Number(this.getAttribute("width")))
      ? Number(this.getAttribute("width"))
      : 16;
  }
  get replacement() {
    return this.hasAttribute("replacement")
      ? this.getAttribute("replacement")
      : "…";
  }
}

function define() {
  customElements.define("wc-trim-middle", WCTrimMiddle, { extends: "span" });
}

function supportsCustomizedBuiltins() {
  if (!("customElements" in window)) return false;
  class P extends HTMLParagraphElement {}
  try {
    customElements.define("wc-p-test", P, { extends: "p" });
    return document.createElement("p", { is: "wc-p-test" }) instanceof P;
  } catch (_e) {
    return false;
  }
}

if (supportsCustomizedBuiltins()) {
  define();
} else {
  const polyfill = document.createElement("script");
  polyfill.src = "https://unpkg.com/@ungap/custom-elements";
  polyfill.onload = define;
  document.head.appendChild(polyfill);
}
