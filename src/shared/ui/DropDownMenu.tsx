import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DropDownMenuChildren = ((close: () => void) => ReactNode) | ReactNode;
interface DropDownMenuProps {
  trigger: ReactNode;
  children: DropDownMenuChildren;
  align?: "left" | "right";
}

export function DropDownMenu({ trigger, children, align = "left" }: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positionReady, setPositionReady] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // 🔥 Calculate position once when dropdown opens
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const menuWidth = 200; // optional: hardcoded or calculate later if needed

      setPosition({
        top: rect.bottom + window.scrollY,
        left:
          align === "right"
            ? rect.right - menuWidth + window.scrollX
            : rect.left + window.scrollX,
      });

      setPositionReady(true);
    } else {
      setPositionReady(false);
    }
  }, [isOpen, align]);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={toggleMenu} className="dropdown__trigger">
        {trigger}
      </div>

      {isOpen && positionReady &&
        createPortal(
          <div
            className={`dropdown__menu dropdown--align-${align}`}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 9999,
              minWidth: "200px", // or whatever width you want
            }}
            ref={menuRef}
          >
            {typeof children === "function" ? children(closeMenu) : children}
          </div>,
          document.body
        )}
    </>
  );
}
