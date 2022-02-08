import "./target.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTarget, saveNotes } from "../../store/target";
import LoadingScreen from "../loading";
import CompanyLogo from "../company_logo";
import { IoGlobeSharp } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { useModal } from "../../context/modal_context";
import EditTargetForm from "./edit_target";
import Contact from "../contact";
import EditContactForm from "../contact/edit_contact";
import AddContact from "../contact/add_contact";

const Target = () => {
	const sessionTarget = useSelector((state) => state.target);
	const { showEditTargetForm, setShowEditTargetForm, setShowAddContactForm } = useModal();
	const { targetId } = useParams();
	const didMount = useRef(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const [target, setTarget] = useState("");
	const [notes, setNotes] = useState("");
	const [contacts, setContacts] = useState("");
	const [financials, setFinancials] = useState("");
	const [saveState, setSaveState] = useState("");

    // This function retrieves the target info from the redux store and sets the associated variables
    // It calls the backend only if the sessionTarget hasn't been retrieved, otherwise it looks for changes to the store
    // and updates accordingly
	useEffect(async () => {
		if (!sessionTarget || targetId != target.id) {
		const res = await dispatch(getTarget(targetId));
        setTarget(res.target);
		setNotes(res.target.notes);
		setContacts(res.contacts);
		setFinancials(res.financials);
        setLoaded(true);
		} else {
		setTarget(sessionTarget.target);
		setNotes(sessionTarget.target.notes);
		setContacts(sessionTarget.contacts);
		setFinancials(sessionTarget.financials);
        setLoaded(true)
        }

	}, [dispatch, targetId, sessionTarget]);

    // Lines 51 through 74 are for the autosave feature in the notes section
	const updateNotes = (e) => {
		setSaveState("Saving...");
		setNotes(e.target.value);
	};
	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (didMount.current) {
				const payload = {
					targetId: targetId,
					notes: notes,
				};

				await dispatch(saveNotes(payload));
				setSaveState("All changes saved");
				setTimeout(() => {
					setSaveState("");
				}, 1000);
			} else {
				didMount.current = true;
			}
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [notes]);

	if (!loaded) {
		return null;
		// return (
		//     <LoadingScreen />
		// )
	}
	return (
		<div className="target-body">
			<EditTargetForm target={target} />
			<div className="target-main">
				<div className="target-main-intro">
					<CompanyLogo name={target.company_name} />
					<div id="target-options"></div>
					<div className="target-intro-details">
						<h1>{target.company_name}</h1>
						<h3>{target.location ? target.location : null}</h3>
						<h5>
							{target.website ? (
								<>
									<IoGlobeSharp size="1.3em" />
									<a target="_blank" href={target.website}>
										{target.website}
									</a>
								</>
							) : null}
						</h5>
						<p>{target.description}</p>
					</div>
				</div>
				<div className="target-detailed-view">
					<div className="half-widget" style={{ marginRight: "auto" }}>
						<div className="widget-header">
							<h2>
								<MdInfo />
								Company Info
							</h2>
							<div className="widget-edit">
								<button onClick={() => setShowEditTargetForm(true)}>
									Edit
								</button>
							</div>
						</div>
						<div className="widget-details">
							<div className="widget-row">
								<div id="widget-row-title">Name</div>
								<div id="widget-row-value">{target.company_name}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Current Status</div>
								<div id="widget-row-value">{target.status || "---"}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Location</div>
								<div id="widget-row-value">{target.location || "---"}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Phone</div>
								<div id="widget-row-value">{target.phone || "---"}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Website</div>
								<div id="widget-row-value">{target.website || "---"}</div>
							</div>
							<div className="widget-row">
								<div id="widget-row-title">Last Updated</div>
								<div id="widget-row-value">{target.updated_at}</div>
							</div>
						</div>
					</div>
					<div className="half-widget">
						<div className="widget-header">
							<h2>
								<RiContactsBookFill />
								Contacts
							</h2>
							<div className="widget-edit">
								<button onClick={() => setShowAddContactForm(true)}>
									Add New Contact
								</button>
							</div>
							<AddContact targetId={target.id} />
						</div>
						<div className="contact-widget-details">
							<EditContactForm />
							{Object.keys(contacts).map((key) => (
								<Contact key={contacts[key].id} contact={contacts[key]} />
							))}
						</div>
					</div>
					<div className="half-widget" style={{ marginRight: "auto" }}>
						<div className="widget-header">
							<h2>
								<AiOutlineStock />
								Financials
							</h2>
						</div>
					</div>
					<div className="half-widget">
						<div className="widget-header">
							<h2>
								<HiPencilAlt />
								Notes
							</h2>
							<div className="widget-edit">{saveState}</div>
						</div>
						<div className="widget-details">
							<textarea
								placeholder="Jot down your notes here..."
								required
								value={notes}
								onChange={updateNotes}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Target;