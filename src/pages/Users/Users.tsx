import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/Users/StatCard/StatCard";
import FilterDropdown from "../../components/Users/Filter/FilterDropdown";
import Pagination from "../../components/common/Pagination/Pagination";
import "./Users.scss";
import usersData from "../../mock/users.json";
import usersIcon from "../../assets/icons/users-page/users.png";
import activeUsersIcon from "../../assets/icons/users-page/active-users.png";
import usersWithLoansIcon from "../../assets/icons/users-page/users-with-loans.png";
import usersWithSavingsIcon from "../../assets/icons/users-page/users-with-savings.png";
import filter from "../../assets/icons/users-page/filter.png";
import options from "../../assets/icons/users-page/options.png";
import viewDetails from "../../assets/icons/users-page/view-details.png";
import blacklist from "../../assets/icons/users-page/blacklist.png";
import activate from "../../assets/icons/users-page/activate.png";

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: number;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatPhoneNumber(phoneNumber: string | number) {
  const digits = phoneNumber.toString();
  if (digits.startsWith("0")) return digits;

  return `0${digits}`;
}

const PAGE_SIZE = 10;

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeRowMenu, setActiveRowMenu] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const navigate = useNavigate();
  const organizationRef = useRef<HTMLImageElement | null>(null);
  const usernameRef = useRef<HTMLImageElement | null>(null);
  const emailRef = useRef<HTMLImageElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);
  const dayRef = useRef<HTMLImageElement | null>(null);
  const statusRef = useRef<HTMLImageElement | null>(null);
  const users = usersData as User[];

  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateJoined: "",
    status: "",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (!filters.organization ||
          user.organization
            ?.toLowerCase()
            .includes(filters.organization.toLowerCase())) &&
        (!filters.username ||
          user.username
            ?.toLowerCase()
            .includes(filters.username.toLowerCase())) &&
        (!filters.email ||
          user.email?.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.phoneNumber ||
          user.phoneNumber.toString().includes(filters.phoneNumber)) &&
        (!filters.status ||
          user.status.toLowerCase() === filters.status.toLowerCase()) &&
        (!filters.dateJoined ||
          new Date(user.dateJoined).toDateString() ===
            new Date(filters.dateJoined).toDateString())
      );
    });
  }, [users, filters]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [currentPage, filteredUsers, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <section className="users">
      <h1 className="users__title">Users</h1>

      <div className="users__stats">
        <StatCard title="Users" value="2,453" bg="#fce8ff" icon={usersIcon} />
        <StatCard
          title="Active Users"
          value="2,453"
          bg="#efe8ff"
          icon={activeUsersIcon}
        />
        <StatCard
          title="Users with Loans"
          value="12,453"
          bg="#feefed"
          icon={usersWithLoansIcon}
        />
        <StatCard
          title="Users with Savings"
          value="102,453"
          bg="#ffebf0"
          icon={usersWithSavingsIcon}
        />
      </div>

      <div className="users__table-wrapper">
        <table className="users__table">
          <thead>
            <tr>
              <th className="col-hide-mobile">
                <div className="th-content">
                  {" "}
                  ORGANIZATION
                  <img
                    ref={organizationRef}
                    src={filter}
                    className="filter-icon"
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === "organization" ? null : "organization",
                      )
                    }
                  />
                  {activeFilter === "organization" && (
                    <FilterDropdown
                      filters={filters}
                      setFilters={setFilters}
                      onClose={() => setActiveFilter(null)}
                      anchorRef={organizationRef}
                    />
                  )}
                </div>
              </th>
              <th className="col-hide-mobile">
                <div className="th-content">
                  USERNAME
                  <img
                    ref={usernameRef}
                    src={filter}
                    className="filter-icon"
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === "username" ? null : "username",
                      )
                    }
                  />
                  {activeFilter === "username" && (
                    <FilterDropdown
                      filters={filters}
                      setFilters={setFilters}
                      onClose={() => setActiveFilter(null)}
                      anchorRef={usernameRef}
                    />
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  EMAIL
                  <img
                    ref={emailRef}
                    src={filter}
                    className="filter-icon"
                    onClick={() =>
                      setActiveFilter(activeFilter === "email" ? null : "email")
                    }
                  />
                  {activeFilter === "email" && (
                    <FilterDropdown
                      filters={filters}
                      setFilters={setFilters}
                      onClose={() => setActiveFilter(null)}
                      anchorRef={emailRef}
                    />
                  )}
                </div>
              </th>
              <th className="col-hide-mobile">
                <div className="th-content">
                  PHONE NUMBER
                  <img
                    ref={phoneRef}
                    src={filter}
                    className="filter-icon"
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === "phoneNumber" ? null : "phoneNumber",
                      )
                    }
                  />
                  {activeFilter === "phoneNumber" && (
                    <FilterDropdown
                      filters={filters}
                      setFilters={setFilters}
                      onClose={() => setActiveFilter(null)}
                      anchorRef={phoneRef}
                    />
                  )}
                </div>
              </th>
              <th className="col-hide-mobile">
                <div className="th-content">
                  DATE JOINED
                  <img
                    ref={dayRef}
                    src={filter}
                    className="filter-icon"
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === "dateJoined" ? null : "dateJoined",
                      )
                    }
                  />
                  {activeFilter === "dateJoined" && (
                    <FilterDropdown
                      filters={filters}
                      setFilters={setFilters}
                      onClose={() => setActiveFilter(null)}
                      anchorRef={dayRef}
                    />
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  STATUS
                  <img
                    ref={statusRef}
                    src={filter}
                    className="filter-icon"
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === "status" ? null : "status",
                      )
                    }
                  />
                  {activeFilter === "status" && (
                    <FilterDropdown
                      filters={filters}
                      setFilters={setFilters}
                      onClose={() => setActiveFilter(null)}
                      anchorRef={statusRef}
                    />
                  )}
                </div>
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="col-hide-mobile">{user.organization}</td>
                <td className="col-hide-mobile">{user.username}</td>
                <td className="col-email">{user.email}</td>
                <td className="col-hide-mobile">
                  {formatPhoneNumber(user.phoneNumber)}
                </td>
                <td className="col-hide-mobile">
                  {formatDate(user.dateJoined)}
                </td>
                <td className="col-status">
                  <span
                    className={`status status--${user.status.toLowerCase()}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="col-actions table-actions">
                  <img
                    src={options}
                    className="options-icon"
                    onClick={() =>
                      setActiveRowMenu(
                        activeRowMenu === user.id ? null : user.id,
                      )
                    }
                  />

                  {activeRowMenu === user.id && (
                    <div className="row-menu">
                      <button
                        className="row-menu__item"
                        onClick={() => navigate(`/user-details/${user.id}`)}
                      >
                        <img src={viewDetails} />
                        View Details
                      </button>

                      <button className="row-menu__item">
                        <img src={blacklist} />
                        Blacklist User
                      </button>

                      <button className="row-menu__item">
                        <img src={activate} />
                        Activate User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRecords={filteredUsers.length}
      />
    </section>
  );
}
