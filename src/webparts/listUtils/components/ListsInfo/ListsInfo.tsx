import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./ListsInfo.module.scss";
import { IListInfo } from "@pnp/sp/lists";
import SPServices from "../../Services";
import ListCard from "../listCard/ListCard";

function ListsInfo(): JSX.Element {
    const [lists, setLists] = useState<IListInfo[]>([]);
    // const [selectedList, setSelectedList] = useState<IListInfo>(null);

    const services = new SPServices();

    useEffect(() => {
        services.getAllLists().then(setLists)
        .catch((error) => console.error(error));
    }, []);

    // const onListClick = (list: IListInfo): void => {
    //     setSelectedList(list);
    // } 

    return (
        <div className={styles.listsInfo}>
            <label>Lists</label>
            <div className={styles.listContainer}>
                {
                    lists.map((list: IListInfo) => {
                        return (
                            <ListCard listInfo={list} key={list.Id} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ListsInfo;
