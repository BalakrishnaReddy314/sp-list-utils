import * as React from "react";
import styles from "./ListCard.module.scss";

interface IInfoCardProps {
    header: string;
    subHeader: string;
}

function InfoCard({ header, subHeader }: IInfoCardProps): JSX.Element {
    return (
        <div className={styles.infoCard}>
            <div className={styles.textBox}>
                <div className={styles.textContent}>
                    <p className={styles.h1}>{header}</p>
                </div>
                <p className={styles.p}>{subHeader}</p>
            </div>
        </div>
    );
}

export default InfoCard;
