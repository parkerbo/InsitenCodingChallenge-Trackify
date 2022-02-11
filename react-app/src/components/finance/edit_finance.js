import "./edit_finance.css"
import Modal from "../modal";
import { useState, useEffect } from "react";
import { useModal } from "../../context/modal_context";
import { useDispatch } from "react-redux";
import { editFinance } from "../../store/target";

const EditFinanceForm = ({ finance, targetId }) => {
	const { showEditFinanceForm, setShowEditFinanceForm } = useModal();
	const [errors, setErrors] = useState([]);
	const [ticker, setTicker] = useState("");

	const [avgVolume, setAvgVolume] = useState(finance.avgVolume || " ");
	const [peRatio, setPeRatio] = useState(finance.peRatio || "");
	const [YTDhigh, setYTDhigh] = useState(finance.YTDhigh || "");
	const [YTDlow, setYTDlow] = useState(finance.YTDlow || "");
	const [netProScore, setNetProScore] = useState(finance.netProScore || "");
	const dispatch = useDispatch();

	const onEdit = async (e) => {
		e.preventDefault();
		let financeId;
		if (!finance.id) {
			financeId = "null";
		} else {
			financeId = finance.id;
		}
		const newFinance = {
			id: financeId,
			target_id: targetId,
			avgVolume: parseFloat(avgVolume),
			peRatio: parseFloat(peRatio),
			YTDhigh: parseFloat(YTDhigh),
			YTDlow: parseFloat(YTDlow),
			netProScore: parseFloat(netProScore),
		};
		const data = await dispatch(editFinance(newFinance));
		if (data) {
			setErrors(data);
		} else {
			setErrors([])
			setShowEditFinanceForm(false);
		}
	};

	const autofillData = async (e) => {
		e.preventDefault();
		const response = await fetch("/api/finances/stock", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ticker: ticker,
			}),
		});
		if (response.ok) {
			const data = await response.json();
			setErrors([])
			setAvgVolume(data.avgVolume);
            setPeRatio(data.peRatio);
            setYTDhigh(data.YTDhigh);
            setYTDlow(data.YTDlow);
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				setErrors(data.errors);
			}
		} else {
			setErrors( ["Unknown symbol. Please try again."]);
		}
	};

	const updateAvgVolume = (e) => {
		setAvgVolume(e.target.value);
	};

	const updatePeRatio = (e) => {
		setPeRatio(e.target.value);
	};

	const updateYTDhigh = (e) => {
		setYTDhigh(e.target.value);
	};

	const updateYTDlow = (e) => {
		setYTDlow(e.target.value);
	};

	const updateNetProScore = (e) => {
		setNetProScore(e.target.value);
	};

	return (
		<Modal
			title={`Edit Financials`}
			onClose={() => {
				setErrors([]);
				setAvgVolume(finance.avgVolume);
				setPeRatio(finance.peRatio);
				setYTDhigh(finance.YTDhigh);
				setYTDlow(finance.YTDlow);
				setNetProScore(finance.netProScore);
				setShowEditFinanceForm(false);
				setTicker("")
			}}
			show={showEditFinanceForm}
		>
			{errors.length > 0 && (
				<div className="form-errors">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
			)}
			<div id="autofill-container">
				<p>
					INFO: If the target company is publicly traded, enter the stock ticker
					symbol to autofill available data.
				</p>
				<input
					type="text"
					style={{width: 115}}
					placeholder="Ticker Symbol"
					value={ticker}
					onChange={(e) => setTicker(e.target.value.toUpperCase())}
				/>
				<button onClick={autofillData} disabled={ticker.length === 0}>Autofill</button>
			</div>
			<form id="modal-form" onSubmit={onEdit}>
				<div>
					<label>Average Volume</label>
					<input
						type="number"
						name="avgVolume"
						onChange={updateAvgVolume}
						value={avgVolume}
					></input>
				</div>
				<div>
					<label>Price-Earnings Ratio</label>
					<input
						type="number"
						step="0.01"
						name="peRatio"
						onChange={updatePeRatio}
						value={peRatio}
					></input>
				</div>
				<div>
					<label>52 Week High</label>
					<input
						type="number"
						name="YTDhigh"
						step="0.01"
						onChange={updateYTDhigh}
						value={YTDhigh}
					></input>
				</div>
				<div>
					<label>52 Week Low</label>
					<input
						type="number"
						name="YTDlow"
						step="0.01"
						onChange={updateYTDlow}
						value={YTDlow}
					></input>
				</div>
				<div>
					<label>Net Promoter Score</label>
					<input
						type="number"
						name="netProScore"
						onChange={updateNetProScore}
						value={netProScore}
					></input>
				</div>

				<button type="submit" id="form-submit-button">Update Financials</button>
			</form>
		</Modal>
	);
};

export default EditFinanceForm;
