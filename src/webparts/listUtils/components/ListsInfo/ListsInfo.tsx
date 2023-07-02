import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./ListsInfo.module.scss";
import { IListInfo } from "@pnp/sp/lists";
import SPServices from "../../Services";
import ListCard from "../listCard/ListCard";

function ListsInfo(): JSX.Element {
    const [lists, setLists] = useState<IListInfo[]>([]);
    // const [selectedList, setSelectedList] = useState<IListInfo>(null);
    const [selectedList, setSelectedList] = useState<IListInfo>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);

    const services = new SPServices();

    const toggleListDetailsModal = (): void => {
        openDetailsModal && setSelectedList(null);
        setOpenDetailsModal(!openDetailsModal);
    }

    useEffect(() => {
        services.getAllLists().then(setLists)
        .catch((error) => console.error(error));
    }, []);

    // const onListClick = (list: IListInfo): void => {
    //     setSelectedList(list);
    // } 

    const getAuthor = (list: IListInfo): string => {
        const tempList = list as any;

        return tempList.Author.Title;
    }

    return (
        <>
            <Modal
                isOpen={openDetailsModal}
                onDismiss={toggleListDetailsModal}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    <h2 className={contentStyles.heading} id="list-title-inside-modal">
                        {selectedList?.Title}
                    </h2>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={toggleListDetailsModal}
                    />
                </div>
                <div className={`${contentStyles.body} d-flex column-gap-3 flex-wrap row-gap-2`}>
                    <InfoCard header={selectedList && getAuthor(selectedList)} subHeader="Creation By"/>
                    <InfoCard header={new Date(selectedList?.Created).toLocaleDateString()} subHeader="Creation Date"/>
                    <InfoCard header={selectedList?.EntityTypeName} subHeader="Entity Type Name"/>
                    <InfoCard header={selectedList?.AllowContentTypes ? "Yes" : "No"} subHeader="Content Types Allowed"/>
                    <InfoCard header={selectedList?.EnableMinorVersions ? "Yes" : "No"} subHeader="Minor Versions Enabled"/>
                </div>
            </Modal>
            <div className={styles.listsInfo}>
                <label>Lists</label>
                <div className={styles.listContainer}>
                    {
                        lists.map((list: IListInfo, index: number) => {
                            return (
                                <ListCard
                                    key={list.Id}
                                    listInfo={list}
                                    index={index}
                                    setOpenModalDetails={setOpenDetailsModal}
                                    setSelectedList={setSelectedList}
                                    // openIndividualBubble={openIndividualBubble}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ListsInfo;
