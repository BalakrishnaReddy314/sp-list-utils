import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SPServices from "../../Services";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { IFieldInfo } from "@pnp/sp/fields/types";

interface IColumn {
    header: string;
    field: string;
}

function ListItems(): JSX.Element {

    const [columns, setColumns] = useState<IColumn[]>([]);
    const [listItems, setListItems] = useState<any[]>([]);
    
    const [ searchParams ] = useSearchParams();

    const services = new SPServices();

    useEffect(() => {
        services.getListFields(searchParams.get("title")).then((fields: IFieldInfo[]) => {
            setColumns(fields.map((f: IFieldInfo) => {return { field: f.InternalName, header: f.Title }}));
            services.getListItems(searchParams.get("title")).then((data: any[]) => {
                setListItems(data);
            }).catch((error: Error) => {
                console.log(error.message);
            })
        }).catch((error: Error) => {
            console.log(error.message);
        });
    }, []);

    return (
        <div className="m-4">
            <div className="d-flex justify-content-between">
                <label className="h4" id="label">{searchParams.get("title")}</label>
            </div>
            <div className="card rounded-0 p-2" style={{height: "75vh", overflow: "auto"}}>
                <div className="d-flex justify-content-end column-gap-3 m-2">
                    <PrimaryButton text="Export to Excel" id="export-to-excel" />
                    <PrimaryButton text="Export to CSV" id="export-to-csv" />
                </div>
                <table className="table table-striped border-top" id="items-table">
                    <thead>
                        <tr>
                            {
                                columns.map((column) => {
                                    return (
                                        <th key={column.header}>{column.header}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listItems.map((row) => {
                                return (
                                    <tr key={row.Id}>
                                        {
                                            columns.map((column) => {
                                                return (
                                                    <td key={`${row.Id}-${column.field}`}>
                                                        {row[column.field]}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListItems;
