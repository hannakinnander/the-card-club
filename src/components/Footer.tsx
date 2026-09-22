const COMPANY_NAME = "The Card Club";
const CONTACT_EMAIL = "info@thecardclub.com";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 text-center">
      <p>{COMPANY_NAME}</p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
