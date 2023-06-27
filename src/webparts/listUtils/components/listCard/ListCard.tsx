import * as React from "react";
import styles from "./ListCard.module.scss";
import { IListInfo } from "@pnp/sp/lists";

interface IListcardProps {
    listInfo: IListInfo
}

function ListCard({ listInfo }: IListcardProps): JSX.Element {
    return (
        <div className={styles.listCard}>
            <p className={styles.listHeading}>{listInfo.Title}</p>
            <p className={styles.listDescription}>{listInfo.Description}</p>
            <button className={styles.acceptButton}>Show Details</button>
        </div>
    );
}

export default ListCard;
