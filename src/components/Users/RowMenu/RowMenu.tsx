import { useLayoutEffect, useRef, useState, useEffect } from "react";
import "./RowMenu.scss";

interface RowMenuProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  children: React.ReactNode;
}

export default function RowMenu({
  anchorRef,
  onClose,
  children,
}: RowMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

  useLayoutEffect(() => {
    if (!anchorRef.current || !menuRef.current) return;

    const triggerRect = anchorRef.current.getBoundingClientRect();
    const menuEl = menuRef.current;
    const menuHeight = menuEl.offsetHeight;
    const menuWidth = menuEl.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = triggerRect.bottom;
    let left = triggerRect.left;

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    if (spaceBelow < menuHeight && spaceAbove >= menuHeight) {
      top = triggerRect.top - menuHeight;
    }

    if (left + menuWidth > viewportWidth - 8) {
      left = viewportWidth - menuWidth - 8;
    }
    if (left < 8) {
      left = 8;
    }

    setStyle({
      position: "fixed",
      top: Math.max(8, top),
      left,
      zIndex: 1000,
      opacity: 1,
    });
  }, [anchorRef.current, menuRef.current]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      )
        return;
      onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  return (
    <div ref={menuRef} style={style} className="row-menu">
      {children}
    </div>
  );
}
