import React from "react";
import {
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from "@material-ui/core/";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../../../redux/actions";
import {
	combineValidators,
	composeValidators,
	isRequired,
	hasLengthGreaterThan,
} from "revalidate";
import cuid from "cuid";
import { reduxForm, Field, change, formValueSelector } from "redux-form";
import TextInput from "./FormInputs/TextInput";
import TextArea from "./FormInputs/TextArea";
import SelectInput from "./FormInputs/SelectInput";
import DateInput from "./FormInputs/DateInput";
import TimeInput from "./FormInputs/TimeInput";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import GeoDecoder from "../../Maps/GeoDecoder";
import SwitchInput from "./FormInputs/SwitchInput";

const styles = (theme) => ({
	mainBg: {
		backgroundColor: grey["50"],
		marginTop: "2rem",
		marginBottom: "2rem",
		padding: "2rem",
	},
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			marginBottom: theme.spacing(2),
		},
	},
	marg: {
		margin: ".5rem",
	},
});

class EventForm extends React.Component {
	componentDidMount = () => {
		this.props.dispatch(change("EventForm", "onlineEventSwitch", false));
		this.props.dispatch(change("EventForm", "mapSwitch", true));
	};

	onFormSubmit = (values) => {
		if (this.props.initialValues.id) {
			this.props.updateEvent(values);
			this.props.history.push(`/events/${this.props.initialValues.id}`);
		} else {
			const newEvent = {
				...values,
				id: cuid(),
				hostPhotoURL: "/assets/user.png",
				hostedBy: "test",
			};
			this.props.createEvent(newEvent);
			this.props.history.push(`/events/${newEvent.id}`);
		}
	};

	render() {
		const { classes } = this.props;
		const {
			initialValues,
			history,
			invalid,
			submitting,
			pristine,
			onlineEventSwitch,
			mapSwitch,
		} = this.props;

		const category = [
			{
				key: "empty",
				text: "",
				value: "",
			},
			{
				key: "Seminar or Talk",
				text: "Seminar or Talk",
				value: "Seminar or Talk",
			},
			{
				key: "Tournament",
				text: "Tournament",
				value: "Tournament",
			},
			{
				key: "Webinar",
				text: "Webinar",
				value: "Webinar",
			},
			{ key: "Attraction", text: "Attraction", value: "Attraction" },
			{
				key: "Camp,Trip, or Retreat",
				text: "Camp, Trip, or Retreat",
				value: "Camp, Trip, or Retreat",
			},
			{
				key: "Class, Training, or Workshop",
				text: "Class, Training, or Workshop",
				value: "Class, Training, or Workshop",
			},
			{
				key: "Concert or Performance",
				text: "Concert or Performance",
				value: "Concert or Performance",
			},
			{
				key: "Festival or Fair",
				text: "Festival or Fair",
				value: "Festival or Fair",
			},
			{
				key: "Game or Competition",
				text: "Game or Competition",
				value: "Game or Competition",
			},
			{
				key: "Meeting",
				text: "Meeting",
				value: "Meeting",
			},
			{
				key: "Party or Social Gathering",
				text: "Party or Social Gathering",
				value: "Party or Social Gathering",
			},
			{
				key: "Culture",
				text: "Culture",
				value: "Culture",
			},
			{
				key: "Others",
				text: "Others",
				value: "Others",
			},
		];

		return (
			<Container maxWidth="md">
				<Paper className={classes.mainBg} elevation={3}>
					<Box textAlign="center" mb="2rem">
						<Typography component="h1" variant="h4">
							<i>
								<u>EVENT FORM</u>
							</i>
						</Typography>
					</Box>
					<form
						onSubmit={this.props.handleSubmit(this.onFormSubmit)}
						autoComplete="off"
						className={classes.root}
					>
						<Box>
							<Grid container spacing={2}>
								<Grid item sm={2}>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										height="100%"
									>
										<Typography
											component="h1"
											variant="h5"
											color="secondary"
										>
											BASIC DETAILS
										</Typography>
									</Box>
								</Grid>

								<Grid item sm={10}>
									<Field
										name="title"
										component={TextInput}
										label="Event Title *"
									/>

									<Field
										name="category"
										component={SelectInput}
										options={category}
										label="Event Category *"
									/>

									<Field
										name="description"
										component={TextArea}
										rows="3"
										label="Event Description *"
									/>
								</Grid>
							</Grid>
							<Divider className={classes.marg} />
						</Box>
						<Box>
							<Grid container spacing={2}>
								<Grid item sm={2}>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										height="100%"
									>
										<Typography
											component="h1"
											variant="h5"
											color="secondary"
										>
											Options
										</Typography>
									</Box>
								</Grid>
								<Grid item sm={10}>
									<Field
										name="onlineEventSwitch"
										component={SwitchInput}
										label="Online event"
										change={change}
										dispatch={this.props.dispatch}
									/>
									<Field
										name="mapSwitch"
										component={SwitchInput}
										label="Use map"
										change={change}
										dispatch={this.props.dispatch}
									/>
								</Grid>
							</Grid>
							<Divider className={classes.marg} />
						</Box>

						{/* Location using mapbox and geocoder */}
						{mapSwitch && (
							<Box>
								<Grid container spacing={2}>
									<Grid item sm={2}>
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
											height="100%"
										>
											<Typography
												component="h1"
												variant="h5"
												color="secondary"
											>
												LOCATION DETAILS
											</Typography>
										</Box>
									</Grid>
									<Grid
										item
										sm={10}
										style={{ width: "100%" }}
									>
										<Field
											name="location"
											component={GeoDecoder}
											change={change}
											dispatch={this.props.dispatch}
										/>
									</Grid>
								</Grid>

								<Divider className={classes.marg} />
							</Box>
						)}

						{/* location using custom text fields */}
						{!mapSwitch && (
							<Box>
								<Grid container spacing={2}>
									<Grid item sm={2}>
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
											height="100%"
										>
											<Typography
												component="h1"
												variant="h5"
												color="secondary"
											>
												LOCATION DETAILS
											</Typography>
										</Box>
									</Grid>
									<Grid
										item
										sm={10}
										style={{ width: "100%" }}
									>
										<Field
											name="AddressLine1"
											component={TextInput}
											label="Address Line 1*"
										/>

										<Field
											name="AddressLine2"
											component={TextInput}
											label="Address Line 2"
										/>
									</Grid>
								</Grid>

								<Divider className={classes.marg} />
							</Box>
						)}

						{/* online event */}
						{onlineEventSwitch && (
							<Box>
								<Grid container spacing={2}>
									<Grid item sm={2}>
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
											height="100%"
										>
											<Typography
												component="h1"
												variant="h5"
												color="secondary"
											>
												ONLINE EVENT
											</Typography>
										</Box>
									</Grid>
									<Grid item sm={10}>
										<Field
											name="link1"
											component={TextInput}
											label="LiveStream URL"
										/>

										<Field
											name="link2"
											component={TextInput}
											label="Webinar URL"
										/>
									</Grid>
								</Grid>
								<Divider className={classes.marg} />
							</Box>
						)}

						<Box>
							<Grid container spacing={2}>
								<Grid item sm={2}>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										height="100%"
									>
										<Typography
											component="h1"
											variant="h5"
											color="secondary"
										>
											DATE {"&"} TIME
										</Typography>
									</Box>
								</Grid>
								<Grid item sm={10}>
									<Field
										name="Date"
										component={DateInput}
										label="Event Date *"
									/>
									<Field
										name="Time"
										component={TimeInput}
										label="Time *"
									/>
								</Grid>
							</Grid>
						</Box>

						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							m="1rem"
						>
							<Box mx="0.5rem">
								<Button
									variant="contained"
									type="submit"
									color="primary"
									disabled={invalid || submitting || pristine}
								>
									Submit
								</Button>
							</Box>
							<Box mx="0.5rem">
								<Button
									variant="contained"
									type="button"
									color="secondary"
									onClick={
										initialValues.id
											? () =>
													history.push(
														`/events/${initialValues.id}`
													)
											: () => history.push("/events")
									}
								>
									Cancel
								</Button>
							</Box>
						</Box>
					</form>
				</Paper>
			</Container>
		);
	}
}

// for getting current form values from global state
const selector = formValueSelector("EventForm");

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.filter((event) => event.id === eventId)[0];
	}

	return {
		initialValues: event,
		onlineEventSwitch: selector(state, "onlineEventSwitch"),
		mapSwitch: selector(state, "mapSwitch"),
	};
};

const actions = {
	createEvent,
	updateEvent,
};

const validate = combineValidators({
	title: isRequired({ message: "Please give your event a name" }),
	city: isRequired({ message: "The Event City is required" }),
	venue: isRequired({ message: "The Venue is required" }),
	category: isRequired({ message: "The Event Category is required" }),
	description: composeValidators(
		isRequired({ message: "The Event Description is required" }),
		hasLengthGreaterThan(4)({
			message: "Event Desciption must be at least 5 characters",
		})
	)(),
	Date: isRequired({ message: "Event Date is required" }),
	Time: isRequired({ message: "Event Time is required" }),
	AddressLine1: isRequired({ message: "Address is required" }),
});

const eventForm = reduxForm({
	form: "EventForm",
	validate,
})(EventForm);

export default connect(mapStateToProps, actions)(withStyles(styles)(eventForm));
