import { Box, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextArea from "../../EventForm/FormInputs/TextArea";
import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";

class CommentForm extends Component {
	handleCommentSubmit = (values) => {
		const {
			reset,
			addEventComment,
			eventId,
			firebase,
			handleCloseReplyForm,
			parentId,
		} = this.props;

		addEventComment(firebase, eventId, values, parentId);
		reset();
		if (parentId !== 0) handleCloseReplyForm();
	};

	render() {
		const { handleCloseReplyForm, reset, parentId } = this.props;
		return (
			<Box>
				<form
					onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}
				>
					<Field
						name="comment"
						component={TextArea}
						rows="3"
						label="Add a comment"
					/>
					<Box mt="0.5rem" display="flex" alignItems="center">
						<Button
							variant="contained"
							color="primary"
							size="small"
							type="submit"
							startIcon={<CreateIcon />}
						>
							Add reply
						</Button>
						{parentId !== 0 && (
							<Box ml="0.2rem">
								<Button
									variant="contained"
									color="secondary"
									size="small"
									type="submit"
									startIcon={<ClearIcon />}
									onClick={() => {
										reset();
										handleCloseReplyForm();
									}}
								>
									Cancel
								</Button>
							</Box>
						)}
					</Box>
				</form>
			</Box>
		);
	}
}

const validate = combineValidators({
	comment: isRequired({ message: "Please enter a comment to add" }),
});

const commentForm = reduxForm({ Fields: "comment", validate })(CommentForm);

export default commentForm;
