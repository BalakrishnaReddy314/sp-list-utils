import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./ListsInfo.module.scss";
import { IListInfo } from "@pnp/sp/lists";
import SPServices from "../../Services";
import ListCard from "../listCard/ListCard";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { IButtonStyles, IconButton } from "office-ui-fabric-react/lib/Button";
import InfoCard from "../listCard/InfoCard";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { FontWeights, getTheme, mergeStyleSets } from "office-ui-fabric-react";

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        width:  "80vw",
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: "1 1 auto",
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: "flex",
            alignItems: "center",
            columnGap: "20px",
            fontWeight: FontWeights.semibold,
            padding: "12px 12px 14px 24px",
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: "inherit",
        margin: "0",
    },
    body: {
        flex: "4 4 auto",
        padding: "0 24px 24px 24px",
        overflowY: "hidden",
        selectors: {
            "p:first-child": { marginTop: 0 },
            "p:last-child": { marginBottom: 0 },
        },
    },
});

const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: "auto",
      marginTop: "4px",
      marginRight: "2px",
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
};

const cancelIcon: IIconProps = { iconName: "Cancel" };

function ListsInfo(): JSX.Element {
    const [lists, setLists] = useState<IListInfo[]>([]);
    // const [selectedList, setSelectedList] = useState<IListInfo>(null);
    const [selectedList, setSelectedList] = useState<IListInfo>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);

    const services = new SPServices();

    const toggleListDetailsModal = (): void => {
        // eslint-disable-next-line no-unused-expressions
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

        return tempList?.Author.Title;
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
