export type ResizeOptions = {
  disabled?: boolean;
  minimumSize?: number;
  handlerSize?: number;
};

export const resize = (node: HTMLElement, options: ResizeOptions = {}) => {
  let initialHeight: number;
  let initialWidth: number;

  let initialPosX: number;
  let initialPosY: number;

  let initialMouseX: number;
  let initialMouseY: number;

  let handledElement: EventTarget | null;

  let {
    minimumSize = options.minimumSize ?? 20,
    disabled = options.disabled ?? false,
    handlerSize = options.handlerSize ?? 10,
  } = options;

  const handlePointerDown = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    initialHeight = node.clientHeight;
    initialWidth = node.clientWidth;

    initialMouseX = e.pageX;
    initialMouseY = e.pageY;

    initialPosX = node.getBoundingClientRect().left;
    initialPosY = node.getBoundingClientRect().top;

    handledElement = e.target;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResize);
  };

  const stopResize = () => {
    window.removeEventListener("pointermove", handlePointerMove);
  };

  const handlePointerMove = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    const direction: string = handledElement.direction;
    if (direction.includes("right")) {
      const width = initialWidth + (e.pageX - initialMouseX);
      if (width > minimumSize) {
        node.style.width = `${width}px`;
      }
    }

    if (direction.includes("bottom")) {
      const height = initialHeight + (e.pageY - initialMouseY);
      if (height > minimumSize) {
        node.style.height = `${height}px`;
      }
    }

    if (direction.includes("left")) {
      const width = initialWidth - (e.pageX - initialMouseX);
      const transformMatrix = getTransform(node);
      const left = initialPosX + (e.pageX - initialMouseX) - transformMatrix.x;

      if (width > minimumSize) {
        node.style.width = `${width}px`; // eslint-disable-line
        node.style.left = `${left}px`;
      }
    }

    if (direction.includes("top")) {
      const height = initialHeight - (e.pageY - initialMouseY);
      const transformMatrix = getTransform(node);
      const top = initialPosY + (e.pageY - initialMouseY) - transformMatrix.y;
      if (height > minimumSize) {
        node.style.top = `${top}px`;
        node.style.height = `${height}px`;
      }
    }
  };

  node.style.position = "absolute";
  const resizers = [
    createDraggableDiv("left top", handlerSize),
    createDraggableDiv("left bottom", handlerSize),
    createDraggableDiv("right top", handlerSize),
    createDraggableDiv("right bottom", handlerSize),
  ];

  resizers.forEach((div) => {
    node.appendChild(div);
    div.addEventListener("pointerdown", handlePointerDown);
  });

  return {
    destroy() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);

      resizers.forEach((div) => {
        node.removeChild(div);
      });
    },

    update(options: ResizeOptions) {
      disabled = options.disabled ?? false;
      minimumSize = options.minimumSize ?? 20;
    },
  };
};

const createDraggableDiv = (directionClass: string, handlerSize: number) => {
  let div = document.createElement("div");
  div.style.height = `${handlerSize}px`;
  div.style.width = `${handlerSize}px`;
  div.style.background = "blue";
  div.style.position = "absolute";
  div.classList.add("resizeable");
  div.direction = directionClass;

  directionClass.split(" ").forEach((direction: string) => {
    div.style[direction] = `-${handlerSize / 2}px` //eslint-disable-line
  });

  return div;
};

function getTransform(element: HTMLElement) {
  const values = element.style.transform.split(/\w+\(|\);?/);
  const transform = values[1].split(/,\s?/g).map((numStr) => parseInt(numStr));

  return {
    x: transform[0] | 0,
    y: transform[1] | 0,
    z: transform[2] | 0,
  };
}
