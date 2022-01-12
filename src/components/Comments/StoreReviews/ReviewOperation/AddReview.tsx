import ReviewForm from "./ReviewForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMessage } from "@fortawesome/pro-regular-svg-icons";

interface Props {
	onAdd: (newRating: number, newComment: string) => void;
	onClose: () => void;
}

const AddReview: React.FC<Props> = (props) => {
	const { onAdd, onClose } = props;

	return (
		<section className="add-review">
			<h3>
				Add Your Review &nbsp;
				{/* <FontAwesomeIcon icon={faMessage as IconProp} /> */}
			</h3>
			<ReviewForm
				defaultRating={null}
				defaultText={null}
				onSubmit={onAdd}
				onClose={onClose}
			/>
		</section>
	);
};

export default AddReview;
