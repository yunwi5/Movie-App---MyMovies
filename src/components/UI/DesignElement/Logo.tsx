import React from "react";
import { ProductionCompany } from "../../../models/Movie";
import { ReactComponent as WaltDisneyLogo } from "../../assets/SVG/Walt_Disney_Pictures.svg";
import { ReactComponent as DCLogo } from "../../../assets/SVG/DC_Comics_Logo.svg";
import { ReactComponent as MarvelLogo } from "../../../assets/SVG/Marvel_Logo.svg";
import { ReactComponent as NetflixLogo } from "../../../assets/SVG/Netflix_Logo.svg";
import { ReactComponent as CPLogo } from "../../../assets/SVG/Columbia_Pictures_Logo.svg";
import { ReactComponent as UPLogo } from "../../../assets/SVG/Universal_Pictures_Logo.svg";
import { ReactComponent as PPLogo } from "../../../assets/SVG/Paramount_Pictures_Logo.svg";

interface Props {
	producerName: ProductionCompany;
}

function getProducerLogo (producerName: ProductionCompany): JSX.Element {
	switch (producerName) {
		case ProductionCompany.MARVEL:
			return <MarvelLogo className="company-logo" />;
		case ProductionCompany.DC_COMICS:
			return <DCLogo className="company-logo" />;
		case ProductionCompany.WALT_DISNEY:
			return <WaltDisneyLogo className="company-logo" />;
		case ProductionCompany.NETFLIX:
			return <NetflixLogo className="company-logo" />;
		case ProductionCompany.COLUMBIA_PICTURES:
			return <CPLogo className="company-logo" />;
		case ProductionCompany.UNIVERSIAL_PICTURES:
			return <UPLogo className="company-logo" />;
		case ProductionCompany.PARAMOUNT_PICTURES:
			return <PPLogo className="company-logo" />;
		default:
			return <MarvelLogo className="company-logo" />;
	}
}

const Logo: React.FC<Props> = (props) => {
	return <div />;
};

export default Logo;
