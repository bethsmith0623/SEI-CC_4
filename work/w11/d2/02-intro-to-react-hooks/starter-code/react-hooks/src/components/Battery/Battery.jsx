import React from "react";
import styles from "./Battery.module.css";

function Battery(props) {
	let height = `${props.level * 100}%`;
	return (
		<div className={styles.Battery}>
			<div className={styles.tip} />
			<div className={styles.level} style={{height}}>
				{props.charging && "⚡"}
				{(props.level * 100).toFixed(0) + "%"}
			</div>
		</div>
	);
}

export default Battery;
