import { useEffect, useRef, useState, useContext, useMemo } from "react";
import Card from "../../components/Card.js"
import "./EnemyDetailsCard.css";

export default function EnemyDetailsCard ({ enemyToDisplay, enemiesList, updateEnemyInput, removeEnemy }) {
	
	const currentEnemyData = () => {
		for (const enemy of enemiesList) {
			if (enemy.uniqueNumber === enemyToDisplay) {
				if (!enemy.name) {
					return {name: "No Enemy Name", statusEffects: []}
				}
				return enemy;
			}
		}
	}

	return (
		<Card className="enemy_card">
			{enemyToDisplay === '' ?
				<label>Select an Enemy</label> :
				<div>
					<label className="enemy_card_label">Enemy:</label>
					<EnemyDetailsDisplay
						enemyData={currentEnemyData()}
						updateEnemyInput={updateEnemyInput}
						removeEnemy={removeEnemy}
					/>
				</div>
			}
		</Card>
	)
}

const EnemyDetailsDisplay = ({ enemyData, updateEnemyInput, removeEnemy }) => {
	const counter = useRef(0);

	useEffect(() => {
		counter.current = enemyData.statusEffects.length;
	}, [enemyData]);

	const addStatusEffect = (name='') => {
		const newStatusEffect = {
			name: name,
			uniqueNumber: counter.current,
		}
		counter.current = counter.current + 1;
		const updatedCardInput = { ...enemyData, statusEffects: [...enemyData.statusEffects, newStatusEffect],
		};
		updateEnemyInput(updatedCardInput);
	}

	return (
		<div className="enemy_details_display">
			<label htmlFor="enemy_name">Name: </label>
			<span id="enemy_name">{enemyData.name}</span><br />
			<label>Status Effects:</label>
			<ul>
				{enemyData.statusEffects.map((fullStatusEffectData) => {
					return (
						<li key={fullStatusEffectData.uniqueNumber}>
							<SingleStatusEffect
								fullStatusEffectData={fullStatusEffectData}
								enemyData={enemyData}
								updateEnemyInput={updateEnemyInput}
							/>
						</li>
					)
				})}
			</ul>
			<input
				type="button"
				value="Add Status Effect"
				className="button_like_input"
				onClick={() => addStatusEffect()}
			/>
			<input
				type="button"
				value="Remove Enemy"
				className="button_like_input"
				onClick={() => removeEnemy(enemyData.uniqueNumber)}
			/>
		</div>
	)
}

const SingleStatusEffect = ({ fullStatusEffectData, enemyData, updateEnemyInput }) => {
	const automatedStatusEffects = ["Bleeding", "Poisoned", "Burning", "Charred", "Chilled"].sort();

	const removeSelf = () => {
		const newStatusEffects = enemyData.statusEffects.filter((statusEffect) => statusEffect.uniqueNumber !== fullStatusEffectData.uniqueNumber);
		updateEnemyInput({
			...enemyData,
			statusEffects: newStatusEffects,
		})

    };

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		const updatedEnemyData = {...enemyData};
		if (name === "x") {
			if (value === "e") {
				return;
			}
			value = Number(value);
		}
		const updatedStatusEffectData = {...fullStatusEffectData, [name]: value};
		updatedEnemyData.statusEffects = enemyData.statusEffects.map((statusEffectData) => {
			return statusEffectData.uniqueNumber === updatedStatusEffectData.uniqueNumber ? updatedStatusEffectData : statusEffectData;
		});

		updateEnemyInput({
			...enemyData,
			statusEffects: updatedEnemyData.statusEffects,
		});
	}

	  // REMEMBER TO GIVE ANY INPUTS A "NAME" PROPERTY.
	  return (
		<div className="single_status_effect">
			<ul>
				<li>
					<select
						id="dropdown"
						value={fullStatusEffectData.name || ""}
						onChange={handleInputChange}
						name='name'
						className="select_effect_dropdown"
					>
						<option key="" value="" disabled>Select Effect:</option>
						{automatedStatusEffects.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
						<option key="Other" value="Other">Other</option>
					</select>
				</li>
				<li>
					<input
						type="number"
						value={fullStatusEffectData.x ? fullStatusEffectData.x : ""}
						onChange={handleInputChange}
						name="x"
						placeholder="X"
						className="x_input"
					/>
				</li>
				{fullStatusEffectData.name === "Other" ?
					<li>
						Duration:
						<input
							type="number"
							value={fullStatusEffectData.otherDuration ? fullStatusEffectData.otherDuration : ""}
							onChange={handleInputChange}
							name="otherDuration"
							placeholder="X"
							className="other_duration_input"
						/>
					</li> : ''
				}
				<li className="remove_button_status_effect_container">
					<div
						className="remove_button_status_effect"
						onClick={() => removeSelf()}
					>
						<div className="x_mark_status_effect" />
					</div>
				</li>
				{fullStatusEffectData.name === "Other" ?
					<li>
						<input
							type="text"
							value={fullStatusEffectData.otherName ? fullStatusEffectData.otherName : ""}
							onChange={handleInputChange}
							name="otherName"
							placeholder="Effect Name"
							className="other_name_input"
						/>
					</li> : ''
				}
				{fullStatusEffectData.name === "Other" ?
					<li>
						<input
							type="text"
							value={fullStatusEffectData.otherDesc ? fullStatusEffectData.otherDesc : ""}
							onChange={handleInputChange}
							name="otherDesc"
							placeholder="Effect Description"
							className="other_description_input"
						/>
					</li> : ''
				}
			</ul>
		</div>
	  );
}
