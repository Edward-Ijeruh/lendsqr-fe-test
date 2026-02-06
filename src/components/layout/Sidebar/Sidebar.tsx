import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import badgePercent from "../../../assets/icons/sidebar/badge-percent.png";
import bank from "../../../assets/icons/sidebar/bank.png";
import briefcase from "../../../assets/icons/sidebar/briefcase.png";
import chartBar from "../../../assets/icons/sidebar/chart-bar.png";
import clipboardList from "../../../assets/icons/sidebar/clipboard-list.png";
import coins from "../../../assets/icons/sidebar/coins.png";
import galaxy from "../../../assets/icons/sidebar/galaxy.png";
import guarantors from "../../../assets/icons/sidebar/guarantors.png";
import handshake from "../../../assets/icons/sidebar/handshake.png";
import home from "../../../assets/icons/sidebar/home.png";
import loanRequests from "../../../assets/icons/sidebar/loan-requests.png";
import piggyBank from "../../../assets/icons/sidebar/piggy-bank.png";
import sack from "../../../assets/icons/sidebar/sack.png";
import scroll from "../../../assets/icons/sidebar/scroll.png";
import sliders from "../../../assets/icons/sidebar/sliders.png";
import transactions from "../../../assets/icons/sidebar/transactions.png";
import userCheck from "../../../assets/icons/sidebar/user-check.png";
import userCog from "../../../assets/icons/sidebar/user-cog.png";
import users from "../../../assets/icons/sidebar/users.png";
import userX from "../../../assets/icons/sidebar/user-x.png";
import chevronDown from "../../../assets/icons/sidebar/chevron-down.png";
import systemWheel from "../../../assets/icons/sidebar/system.png";
import logout from "../../../assets/icons/sidebar/logout.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("lendsqr_auth");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__org-switch">
        <img src={briefcase} alt="Briefcase Icon" />
        <span className="sidebar__org-text">Switch Organization</span>
        <img src={chevronDown} alt="Expand Icon" />
      </div>

      <nav className="sidebar__nav">
        <a href="#" className="sidebar__link">
          <img src={home} alt="Dashboard Icon" />
          <span>Dashboard</span>
        </a>

        <div className="sidebar__section">
          <p className="sidebar__section-title">CUSTOMERS</p>

          <a href="#" className="sidebar__link sidebar__link--active">
            <img src={users} alt="Users Icon" />
            <span>Users</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={guarantors} alt="Guarantors Icon" />
            <span>Guarantors</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={sack} alt="Loans Icon" />
            <span>Loans</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={handshake} alt="Decision Models Icon" />
            <span>Decision Models</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={piggyBank} alt="Savings Icon" />
            <span>Savings</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={loanRequests} alt="Loan Requests Icon" />
            <span>Loan Requests</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={userCheck} alt="Whitelist Icon" />
            <span>Whitelist</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={userX} alt="Karma Icon" />
            <span>Karma</span>
          </a>
        </div>

        <div className="sidebar__section">
          <p className="sidebar__section-title">BUSINESSES</p>

          <a href="#" className="sidebar__link">
            <img src={briefcase} alt="Organization Icon" />
            <span>Organization</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={loanRequests} alt="Loan Products Icon" />
            <span>Loan Products</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={bank} alt="Savings Products Icon" />
            <span>Savings Products</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={coins} alt="Fees and Charges Icon" />
            <span>Fees and Charges</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={transactions} alt="Transactions Icon" />
            <span>Transactions</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={galaxy} alt="Services Icon" />
            <span>Services</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={userCog} alt="Service Account Icon" />
            <span>Service Account</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={scroll} alt="Settlements Icon" />
            <span>Settlements</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={chartBar} alt="Reports Icon" />
            <span>Reports</span>
          </a>
        </div>

        <div className="sidebar__section">
          <p className="sidebar__section-title">SETTINGS</p>

          <a href="#" className="sidebar__link">
            <img src={sliders} alt="Preferences Icon" />
            <span>Preferences</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={badgePercent} alt="Fees and Pricing Icon" />
            <span>Fees and Pricing</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={clipboardList} alt="Audit Logs Icon" />
            <span>Audit Logs</span>
          </a>

          <a href="#" className="sidebar__link">
            <img src={systemWheel} alt="Audit Logs Icon" />
            <span>Systems Messages</span>
          </a>
        </div>

        <hr className="logout__divider" />
        <button
          className="sidebar__link sidebar__logout"
          onClick={handleLogout}
        >
          <img src={logout} alt="Logout button" />
          <span>Logout</span>
        </button>

        <span className="version">v1.2.0</span>
      </nav>
    </aside>
  );
}
