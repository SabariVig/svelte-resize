export type ResizeOptions = {
  disabled?: boolean;
  minimumSize?: number;
  maximumSize?: number | null;
  handlerSize?: number;
  handlers?: Handlers;
  borderStyle?: string;
  position?: "absolute" | "relative"
};

export type Handlers = {
  leftTop?: boolean;
  leftBottom?: boolean;
  rightTop?: boolean;
  rightBottom?: boolean;
};

export const resize = (node: HTMLElement, options: ResizeOptions = {}) => {
  let initialHeight: number;
  let initialWidth: number;

  let initialPosX: number;
  let initialPosY: number;

  let initialMouseX: number;
  let initialMouseY: number;

  let handledElement: HTMLElement | null;
  let transformMatrix: { x: number; y: number; z: number };
  let handlersAvail: Handlers = {
    leftTop: true,
    leftBottom: true,
    rightTop: true,
    rightBottom: true,
  };

  let {
    minimumSize = options.minimumSize ?? 20,
    disabled = options.disabled ?? false,
    handlerSize = options.handlerSize ?? 10,
    handlers = options.handlers ?? handlersAvail,
    maximumSize = options.maximumSize ?? null,
    borderStyle = options.borderStyle ?? "2px solid rgba(0, 0, 0, 0.4)",
    position = options.position ?? "absolute"
  } = options;

  node.style.position = position;

  const onResizeStart = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    initialHeight = node.clientHeight;
    initialWidth = node.clientWidth;

    initialMouseX = e.pageX;
    initialMouseY = e.pageY;

    initialPosX = node.getBoundingClientRect().left;
    initialPosY = node.getBoundingClientRect().top;
    transformMatrix = getTransform(node);

    handledElement = e.target as HTMLElement;
    window.addEventListener("pointermove", onResize);
    window.addEventListener("pointerup", onResizeStop);

    console.log({ initialPosY, initialPosX, initialMouseX, initialMouseY });
  };

  const onResizeStop = () => {
    window.removeEventListener("pointermove", onResize);
  };

  const onResize = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    const coordinates: string =
      handledElement?.getAttribute("data-coordinates") ?? "";
    if (coordinates.includes("right")) {
      const width = initialWidth + (e.pageX - initialMouseX);
      if (width > minimumSize && (maximumSize ? width < maximumSize : true)) {
        node.style.width = `${width}px`;
      }
    }

    if (coordinates.includes("bottom")) {
      const height = initialHeight + (e.pageY - initialMouseY);
      if (height > minimumSize && (maximumSize ? height < maximumSize : true)) {
        node.style.height = `${height}px`;
      }
    }

    if (coordinates.includes("left")) {
      const width = initialWidth - (e.pageX - initialMouseX);
      const left = initialPosX + (e.pageX - initialMouseX) - transformMatrix.x;

      if (width > minimumSize && (maximumSize ? width < maximumSize : true)) {
        node.style.width = `${width}px`;

        node.style.left = `${left}px`;
      }
    }

    if (coordinates.includes("top")) {
      const height = initialHeight - (e.pageY - initialMouseY);
      const top = initialPosY + (e.pageY - initialMouseY) - transformMatrix.y;

      if (height > minimumSize && (maximumSize ? height < maximumSize : true)) {
        node.style.height = `${height}px`;
        node.style.top = `${top}px`;
      }
    }
  };

  let resizers: HTMLElement[] = [];
  Object.keys(handlers).forEach((key) => {
    if (handlers[key as keyof Handlers] !== true) {
      return;
    }

    let div = createResizersDiv(key.toLowerCase(), handlerSize, borderStyle);
    node.appendChild(div);
    div.addEventListener("pointerdown", onResizeStart);
    resizers = [...resizers, div];
  });

  return {
    destroy() {
      window.removeEventListener("pointermove", onResize);
      window.removeEventListener("pointerup", onResizeStop);

      resizers.forEach((div) => {
        node.removeChild(div);
      });
    },

    update(options: ResizeOptions) {
      disabled = options.disabled ?? false;
      minimumSize = options.minimumSize ?? 20;
      maximumSize = options.maximumSize ?? null;
      handlers = options.handlers ?? handlersAvail;
      borderStyle = options.borderStyle ?? "2px solid rgba(0, 0, 0, 0.4)";
      position = options.position ?? "absolute";
    },
  };
};

const createResizersDiv = (
  coordinates: string,
  handlerSize: number,
  borderStyle: string,
) => {
  let div = document.createElement("div");
  let cursorDirection = "";
  div.style.height = `${handlerSize}px`;
  div.style.width = `${handlerSize}px`;
  div.style.position = "absolute";
  div.classList.add("resizeable");
  div.dataset.coordinates = coordinates;

  const positionStyle = `-${handlerSize / 2}px`;
  if (coordinates.includes("top")) {
    div.style["top"] = positionStyle;
    div.style.borderTop = borderStyle;
    cursorDirection += "n";
  }
  if (coordinates.includes("bottom")) {
    div.style["bottom"] = positionStyle;
    div.style.borderBottom = borderStyle;
    cursorDirection += "s";
  }
  if (coordinates.includes("right")) {
    div.style["right"] = positionStyle;
    div.style.borderRight = borderStyle;
    cursorDirection += "e";
  }
  if (coordinates.includes("left")) {
    div.style["left"] = positionStyle;
    div.style.borderLeft = borderStyle;
    cursorDirection += "w";
  }
  div.style.cursor = `${cursorDirection}-resize`;

  return div;
};

function getTransform(element: HTMLElement) {
  const values = element.style.transform.split(/\w+\(|\);?/);
  if (!values[1]) {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }
  const transform = values[1]?.split(/,\s?/g).map((numStr) => parseInt(numStr));
  return {
    x: transform[0],
    y: transform[1],
    z: transform[2],
  };
}
