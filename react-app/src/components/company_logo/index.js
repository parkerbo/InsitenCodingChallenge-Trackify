import "./company_logo.css"

const CompanyLogo = ({ name }) => {
	function getInitial(name) {
		return name.charAt(0).toUpperCase();
	}
	return (
		<div className="company-logo">
			<div>{getInitial(name)}</div>
		</div>
	);
};

export default CompanyLogo;
