import "./company_logo.css"

const CompanyLogo = ({ name }) => {

	return (
		<div className="company-logo">
			<div>{name.charAt(0).toUpperCase()}</div>
		</div>
	);
};

export default CompanyLogo;
