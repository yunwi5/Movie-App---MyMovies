import { ProductionCompany } from "../../models/Movie";
import { ReactComponent as WaltDisneyLogo } from "../../assets/SVG/Walt_Disney_Pictures.svg";
import { ReactComponent as DCLogo } from "../../assets/SVG/DC_Comics_Logo.svg";
import { ReactComponent as MarvelLogo } from "../../assets/SVG/Marvel_Logo.svg";
import { ReactComponent as NetflixLogo } from "../../assets/SVG/Netflix_Logo.svg";
import { ReactComponent as CPLogo } from "../../assets/SVG/Columbia_Pictures_Logo.svg";
import { ReactComponent as UPLogo } from "../../assets/SVG/Universal_Pictures_Logo.svg";
import { ReactComponent as PPLogo } from "../../assets/SVG/Paramount_Pictures_Logo.svg";

export function getProducerLogo (producerName: ProductionCompany): JSX.Element {
	switch (producerName) {
		case ProductionCompany.MARVEL:
			return <MarvelLogo className="company-logo marvel-logo" />;
		case ProductionCompany.DC_COMICS:
			return <DCLogo className="company-logo dc-logo" />;
		case ProductionCompany.WALT_DISNEY:
			return <WaltDisneyLogo className="company-logo disney-logo" />;
		case ProductionCompany.NETFLIX:
			return <NetflixLogo className="company-logo netflix-logo" />;
		case ProductionCompany.COLUMBIA_PICTURES:
			return <CPLogo className="company-logo cp-logo" />;
		case ProductionCompany.UNIVERSIAL_PICTURES:
			return <UPLogo className="company-logo up-logo" />;
		case ProductionCompany.PARAMOUNT_PICTURES:
			return <PPLogo className="company-logo pp-logo" />;
		default:
			return <MarvelLogo className="company-logo marvel-logo" />;
	}
}
