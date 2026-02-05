import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usersData from "../../mock/users.json";
import { formatPhoneNumber } from "../../utils/formatters";
import "./UserDetail.scss";
import type { UserDetail } from "../../types/user";
import Section from "../../components/UserDetails/Section/Section";
import Detail from "../../components/UserDetails/Detail/Detail";
import backBtn from "../../assets/icons/user-detail/back-btn.png";
import avatar from "../../assets/icons/user-detail/avatar.png";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = (usersData as UserDetail[]).find((u) => u.id === id);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const guarantorFullName = `${user.guarantorFirstName} ${user.guarantorLastName}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section className="user-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <img src={backBtn} alt="Back button" />
        Back to Users
      </button>

      <div className="header">
        <h1>User Details</h1>

        <div className="header-actions">
          <button className="btn-outline danger">Blacklist User</button>
          <button className="btn-outline success">Activate User</button>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-left">
          <div className="avatar">
            <img src={avatar} alt="Profile placeholder" />
          </div>

          <div className="user-main">
            <h2>{fullName}</h2>
            <p>{user.username}</p>
          </div>
        </div>

        <div className="profile-divider" />

        <div className="tier">
          <span>User’s Tier</span>
          <div className="stars">★ ★ ☆</div>
        </div>

        <div className="profile-divider" />

        <div className="balance">
          <h3>{user.accountBalance}</h3>
          <p>
            {user.accountNumber}/{user.bankName}
          </p>
        </div>
      </div>

      <div className="tabs">
        <button className="active">General Details</button>
        <button>Documents</button>
        <button>Bank Details</button>
        <button>Loans</button>
        <button>Savings</button>
        <button>App and System</button>
      </div>

      <div className="detail-card">
        <Section title="Personal Information">
          <Detail label="Full Name" value={fullName} />
          <Detail
            label="Phone Number"
            value={formatPhoneNumber(user.phoneNumber)}
          />
          <Detail label="Email Address" value={user.email} />
          <Detail label="BVN" value={user.bvn.toString()} />
          <Detail label="Gender" value={user.gender} />
          <Detail label="Marital Status" value={user.maritalStatus} />
          <Detail label="Children" value={user.children.toString()} />
          <Detail label="Type of Residence" value={user.typeOfResidence} />
        </Section>

        <Section title="Education and Employment">
          <Detail label="Level of Education" value={user.levelOfEducation} />
          <Detail label="Employment Status" value={user.employmentStatus} />
          <Detail
            label="Sector of Employment"
            value={user.sectorOfEmployment}
          />
          <Detail
            label="Duration of Employment"
            value={user.durationOfEmployment}
          />
          <Detail label="Office Email" value={user.officeEmail} />
          <Detail label="Monthly Income" value={`₦${user.monthlyIncome}`} />
          <Detail label="Loan Repayment" value={user.loanRepayment} />
        </Section>

        <Section title="Socials">
          <Detail label="Twitter" value={user.twitter} />
          <Detail label="Facebook" value={user.facebook} />
          <Detail label="Instagram" value={user.instagram} />
        </Section>

        <Section title="Guarantor">
          <Detail label="Full Name" value={guarantorFullName} />
          <Detail
            label="Phone Number"
            value={formatPhoneNumber(user.guarantorPhoneNumber)}
          />
          <Detail label="Email Address" value={user.guarantorEmail} />
          <Detail label="Relationship" value={user.guarantorRelationship} />
        </Section>
      </div>
    </section>
  );
}
