import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactDOM from "react-dom";

const Modal = forwardRef((props, ref) => {
  const [display, setdisplay] = useState(false);
  const [content, setcontent] = useState("");
  const [modalClasses, setModalClasses] = useState("");

  useImperativeHandle(ref, () => {
    return {
      open: (content, modalClasses = "w-11/12") => {
        setdisplay(true);
        setcontent(content);
        setModalClasses(modalClasses);
      },
      close: () => {
        setdisplay(false);
      },
    };
  });

  return display
    ? ReactDOM.createPortal(
        <div
          className="fixed top-0 bottom-0 right-0 left-0 z-20"
          style={{ backgroundColor: "rgb(0,0,0,0.3)" }}>
          <div className="fixed top-0 bottom-0 right-0 left-0">
            <div
              style={{ top: "50%", left: "50%" }}
              className={`relative bg-white min-h-1/4s h-auto  transform -translate-x-1/2 -translate-y-1/2 ${modalClasses}`}>
              {/* <div className="flex justify-end py-2 h-auto overflow-y-auto"></div> */}
              {content}
            </div>
          </div>
        </div>,
        document.querySelector("#modal")
      )
    : null;
});

export default Modal;
