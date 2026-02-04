import "./Topbar.scss";
import logo from "../../../assets/images/common/logo.svg";
import searchIcon from "../../../assets/icons/topbar/search-icon.png";
import bellIcon from "../../../assets/icons/topbar/bell-icon.png";
import profileImg from "../../../assets/icons/topbar/profile-img.png";
import arrowDown from "../../../assets/icons/topbar/arrow-down.png";

interface TopbarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export default function Topbar({ onMenuClick, isMenuOpen }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <img src={logo} alt="Lendsqr Logo" className="topbar__logo" />
        <button
          className={`topbar__menu-btn ${
            isMenuOpen ? "topbar__menu-btn--open" : ""
          }`}
          onClick={onMenuClick}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="topbar__search">
        <input type="text" placeholder="Search for anything" />
        <button type="button">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      <div className="topbar__right">
        <p className="topbar__docs">Docs</p>

        <img src={bellIcon} alt="Notifications" className="topbar__bell" />

        <div className="topbar__profile">
          <div className="topbar__avatar">
            <img src={profileImg} alt="Profile" />
          </div>

          <span className="topbar__name">Adedeji</span>

          <img src={arrowDown} alt="Open profile" className="topbar__arrow" />
        </div>
      </div>
    </header>
  );
}
