import React from "react";
import "./Contact.css";
import {
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ContactIcon from "../../assets/contact.svg";
import SocialIcon from "../../assets/social.png"; // Replace with actual filename
import PhoneIcon from "../../assets/phone.png"; // Replace with actual filename
import AddressIcon from "../../assets/address.png";

const councilMembers = [
  {
    portfolio: "ASMP",
    members: [
      {
        name: "Anshika Mishra",
        linkedinUsername: "anshika-mishra-952715267",
        instagramUsername: "anshika.mishra?igsh=aW1zMmtobjNoaXU4",
        photo: "anshika.jpg",
      },
      {
        name: "Nishit Moonat",
        linkedinUsername: "nishit-moonat-416187250",
        instagramUsername: "nishitt27?igsh=MWJlajJmMnlhcW1kdA==",
        photo: "nishit.jpg",
      },
    ],
  },
  {
    portfolio: "HDA",
    members: [
      {
        name: "Bhakti Joshi",
        linkedinUsername: "bhakti-joshi-33b1b7252/",
        instagramUsername: "bhaktijoshi_14",
        photo: "bhakti.jpg",
      },
      {
        name: "Ishaan Grover",
        linkedinUsername: "ishan-grover-30b499256/",
        instagramUsername: "ishan__grover/",
        photo: "ishan.jpg",
      },
    ],
  },
  {
    portfolio: "Events",
    members: [
      {
        name: "Aditya Singh",
        linkedinUsername: "aditya-singh-4b2052201/",
        instagramUsername: "_adityasingh96/",
        photo: "aditya_singh.jpg",
      },
      {
        name: "Arnav Mishra",
        linkedinUsername: "arnav-mishra-b1000924b/",
        instagramUsername: "arnavm7203?igsh=MTJwNGJsejFxenRvZQ==",
        photo: "arnav.JPG",
      },
    ],
  },
  {
    portfolio: "Operations",
    members: [
      {
        name: "Aditya Aryan",
        linkedinUsername: "aditya-aryan-3aba9b250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "adi__aaryan?igsh=MWtqNTU1MDJ0MmY3Yw==",
        photo: "aditya_aryan.jpeg",
      },
      {
        name: "Hemendra Suthar",
        linkedinUsername: "hemendrasuthar/",
        instagramUsername: "hemendra._.s/",
        photo: "hemendra.jpg",
      },
    ],
  },
  {
    portfolio: "Marketing",
    members: [
      {
        name: "Himanya Garg",
        linkedinUsername: "himanya-garg-75230a256/",
        instagramUsername: "himanya_garg30?igshid=ZDc4ODBmNjlmNQ==",
        photo: "himanya.jpg",
      },
      {
        name: "Karthik Vaishnav",
        linkedinUsername: "kartik-vaishnav-12a758251/",
        instagramUsername: "kartik__vaishnav?igsh=MXU0cGE3cTUzbGVsYw==",
        photo: "karthik.jpg",
      },
    ],
  },
  {
    portfolio: "Design",
    members: [
      {
        name: "Akshita Choudhary",
        linkedinUsername: "akshita-choudhary-851319253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "akshita_choudhary1905?igsh=MWg2dXJzcm1yOGR4Yw==",
        photo: "akshita.jpg",
      },
      {
        name: "Jinisha Sabadra",
        linkedinUsername: "jinisha-sabadra-37949a263",
        instagramUsername: "jinisha_2784?igsh=eTR2YjJveDRvM29p",
        photo: "jinisha.png",
      },
    ],
  },
  {
    portfolio: "MPR",
    members: [
      {
        name: "Ananya Patil",
        linkedinUsername: "ananya-patil-a18437281/",
        instagramUsername: "ananyapatil._/",
        photo: "ananya.png",
      },
      {
        name: "Rutuja Khandekar",
        linkedinUsername: "rutuja-khandekar-42971b248/",
        instagramUsername: "___.rutujaaa.__/",
        photo: "rutuja.jpg",
      },
    ],
  },
  {
    portfolio: "Web",
    members: [
      {
        name: "Ashwani Dubey",
        linkedinUsername: "ashwani-dubey-3b2a81258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUsername: "kanhahihu?igsh=MW5xeHZoNW1vbmZlaw==",
        photo: "ashwani.jpg",
      },
    ],
  },
];

const socialLinksOC = () => [
  {
    href: `https://www.linkedin.com/in/aniruddhgoyal`,
    ariaLabel: "LinkedIn",
    social: "linkedin",
    svgPath:
      "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    tooltip: "LinkedIn",
  },
  {
    href: `https://www.instagram.com/anniboii/`,
    ariaLabel: "Instagram",
    social: "instagram",
    svgPath:
      "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    tooltip: "Instagram",
  },
];

const socialLinks = (linkedinUsername, instagramUsername) => [
  {
    href: `https://www.linkedin.com/in/${linkedinUsername}`,
    ariaLabel: "LinkedIn",
    social: "linkedin",
    svgPath:
      "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    tooltip: "LinkedIn",
  },
  {
    href: `https://www.instagram.com/${instagramUsername}`,
    ariaLabel: "Instagram",
    social: "instagram",
    svgPath:
      "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    tooltip: "Instagram",
  },
];

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Header */}
      <h1 className="contact-title">
        CONTACT US
        <img src={ContactIcon} alt="Contact Icon" className="contact-icon" />
      </h1>

      {/* Council Members Section */}
      <section className="council-section">
        <h2>Council Members</h2>
        <p>Meet our council members</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 className="portfolio-title">Overall Coordinator</h3>
          <div className="council-card first-card">
            <img
              src={require("../../assets/ctm/aniruddha.jpg")}
              alt="Aniruddha Goyal"
              className="profile-placeholder"
            />
            <div className="council-info">
              <div>
                <h3>Aniruddha Goyal</h3>
                <p className="role">Overall Coordinator</p>
              </div>
              <ul className="example-2">
                {socialLinksOC().map(
                  ({ href, ariaLabel, social, svgPath, tooltip }) => (
                    <li className="icon-content" key={social}>
                      <a
                        href={href}
                        aria-label={ariaLabel}
                        data-social={social}
                      >
                        <div className="filled"></div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1"
                          height="1"
                          fill="currentColor"
                          viewBox="-2 -4 20 25"
                        >
                          <path d={svgPath} fill="currentColor"></path>
                        </svg>
                      </a>
                      <div className="tooltip">{tooltip}</div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {Array.from({ length: Math.ceil(councilMembers.length / 3) }).map(
          (_, index) => {
            const startIndex = index * 3;
            const portfoliosInRow = councilMembers.slice(
              startIndex,
              startIndex + 3
            );

            return (
              <div key={index} className="portfolio-wrapper">
                {portfoliosInRow.map((portfolio, i) => (
                  <div key={i} className="portfolio-section">
                    {/* Portfolio Name */}
                    <h3 className="portfolio-title">{portfolio.portfolio}</h3>

                    {/* Two Members in a Column */}
                    <div className="council-grid">
                      {portfolio.members.map((member, j) => (
                        <div className="council-card" key={j}>
                          <img
                            src={require(`../../assets/ctm/${member.photo}`)}
                            alt={member.name}
                            className="profile-placeholder"
                          />
                          <div className="council-info">
                            <>
                              <h3>{member.name}</h3>
                              <p className="role">{portfolio.portfolio}</p>
                              <p className="username">{member.username}</p>
                            </>
                            <>
                              <ul className="example-2">
                                {socialLinks(member.linkedinUsername, member.instagramUsername).map(
                                  ({ href, ariaLabel, social, svgPath, tooltip }) => (
                                    <li className="icon-content" key={social}>
                                      <a
                                        href={href}
                                        aria-label={ariaLabel}
                                        data-social={social}
                                        target="_blank" rel="noopener noreferrer"
                                      >
                                        <div className="filled"></div>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="1"
                                          height="1"
                                          fill="currentColor"
                                          viewBox="-2 -4 20 25"
                                        >
                                          <path
                                            d={svgPath}
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </a>
                                      <div className="tooltip">{tooltip}</div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        )}
      </section>

      {/* Additional Contacts Section */}
      <div className="additional-contacts">
        <h2 className="contact-heading">Additional Contacts</h2>
        <p className="contact-subtext">
          Connect with us through various channels
        </p>

        <div className="contact-info">
          {/* Social Media */}
          <div className="contact-item">
            <img src={SocialIcon} alt="Social Media" className="contact-icon" />
            <p className="contact-label">Mail Us</p>
            <p className="contact-detail">sarc@iitb.ac.in </p>
          </div>

          {/* Phone Number */}
          <div className="contact-item">
            <img src={PhoneIcon} alt="Phone Number" className="contact-icon" />
            <p className="contact-label">Phone Number</p>
            <p className="contact-detail">+91 62631 73987</p>
          </div>

          {/* Address */}
          <div className="contact-item">
            <img src={AddressIcon} alt="Address" className="contact-icon" />
            <p className="contact-label">Address</p>
            <p className="contact-detail">SARC Room, Old SAC, IIT Bombay</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <p>
          Mail: sarc@iitb.ac.in &nbsp; | &nbsp; Phone: +91 62631 73987 &nbsp; |
          &nbsp; Address: SARC Room, Old SAC, IIT Bombay
        </p>
      </footer>
    </div>
  );
};

export default Contact;
