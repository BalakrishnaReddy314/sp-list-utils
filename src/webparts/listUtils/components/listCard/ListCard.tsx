import * as React from "react";
import styles from "./ListCard.module.scss";
import { useNavigate } from "react-router-dom";
import { IListInfo } from "@pnp/sp/lists";

interface IListcardProps {
    listInfo: IListInfo;
    index: number;
    setSelectedList: React.Dispatch<React.SetStateAction<IListInfo>>;
    setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListCard({ listInfo, index, setOpenModalDetails, setSelectedList }: IListcardProps): JSX.Element {

    const navigate = useNavigate();

    const onShowDetailsClick = (): void => {
        setSelectedList(listInfo);
    }

    const onViewItemsClick = (): void => {
        navigate(`/items?title=${listInfo.Title}`);
    }

    return (
        <div className={styles.listCard}>
            <p className={`${styles.listHeading} d-flex align-items-center column-gap-2`} id="list-title">
                <span>{listInfo.Title}</span>
            </p>
            <p className={styles.listDescription}>{listInfo.Description}</p>
            <div className="w-100 d-flex flex-column row-gap-3">
                <button
                    id={`details-button-${index}`}
                    className={styles.acceptButton}
                    onClick={onShowDetailsClick}
                >
                    Show Details
                </button>
                <button
                    id={`items-button-${index}`}
                    className={styles.acceptButton}
                    onClick={onViewItemsClick}
                >
                    View Items ({listInfo.ItemCount})
                </button>
            </div>
        </div>
    );
}

export default ListCard;