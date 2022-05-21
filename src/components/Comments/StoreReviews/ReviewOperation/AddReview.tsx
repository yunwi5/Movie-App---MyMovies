import ReviewForm from './ReviewForm';

interface Props {
    onAdd: (newRating: number, newComment: string) => void;
    onClose: () => void;
}

const AddReview: React.FC<Props> = (props) => {
    const { onAdd, onClose } = props;

    return (
        <section className="add-review">
            <h3>Add Your Review &nbsp;</h3>
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
