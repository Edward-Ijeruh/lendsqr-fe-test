import "./FilterDropdown.scss";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface Filters {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

interface FilterDropdownProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export default function FilterDropdown({
  filters,
  setFilters,
  onClose,
  anchorRef,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (!anchorRef.current || !dropdownRef.current) return;

    const triggerRect = anchorRef.current.getBoundingClientRect();
    const dropdownEl = dropdownRef.current;

    const dropdownHeight = dropdownEl.offsetHeight;
    const dropdownWidth = dropdownEl.offsetWidth;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = triggerRect.bottom + 8;
    let left = triggerRect.left;

    if (top + dropdownHeight > viewportHeight - 16) {
      top = triggerRect.top - dropdownHeight - 8;
    }

    if (left + dropdownWidth > viewportWidth - 16) {
      left = viewportWidth - dropdownWidth - 16;
    }

    top = Math.max(16, top);

    setStyle({
      position: "fixed",
      top,
      left,
      zIndex: 1000,
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        dropdownRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, anchorRef]);

  return (
    <div ref={dropdownRef} className="filter-dropdown" style={style}>
      <label>Organization</label>
      <div className="select-input">
        <select
          value={filters.organization}
          onChange={(e) =>
            setFilters((f) => ({ ...f, organization: e.target.value }))
          }
        >
          <option value="">Select</option>
          <option>Lendsqr</option>
          <option>Irorun</option>
        </select>
      </div>

      <label>Username</label>
      <input
        placeholder="User"
        value={filters.username}
        onChange={(e) =>
          setFilters((f) => ({ ...f, username: e.target.value }))
        }
      />

      <label>Email</label>
      <input
        placeholder="Email"
        value={filters.email}
        onChange={(e) => setFilters((f) => ({ ...f, email: e.target.value }))}
      />

      <label>Phone</label>
      <input
        placeholder="Phone number"
        value={filters.phoneNumber}
        onChange={(e) =>
          setFilters((f) => ({ ...f, phoneNumber: e.target.value }))
        }
      />

      <label>Date</label>
      <div className="date-input">
        <input
          type="date"
          value={filters.dateJoined}
          onChange={(e) =>
            setFilters((f) => ({ ...f, dateJoined: e.target.value }))
          }
        />
      </div>

      <label>Status</label>
      <div className="select-input">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
        >
          <option value="">Select</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
          <option>Blacklisted</option>
        </select>
      </div>

      <div className="filter-actions">
        <button
          className="reset"
          onClick={() =>
            setFilters({
              organization: "",
              username: "",
              email: "",
              phoneNumber: "",
              dateJoined: "",
              status: "",
            })
          }
        >
          Reset
        </button>

        <button className="apply" onClick={onClose}>
          Filter
        </button>
      </div>
    </div>
  );
}
