import { getSP } from "./pnpJsConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp";
import { IFieldInfo } from "@pnp/sp/fields/types";
import "@pnp/sp/lists";
import { IListInfo } from "@pnp/sp/lists";
import "@pnp/sp/fields/list";


export default class SPServices {
    private _sp: SPFI;
    constructor() {
        this._sp = getSP();
    }

    public async getAllLists(): Promise<IListInfo[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<IListInfo[]>(async (resolve, reject) => {
            try {
                const lists = await this._sp.web.lists.filter("(Hidden eq false) and (BaseTemplate eq 100)").select("*")();
                resolve(lists);
            } catch (error) {
                reject(error);
            }
        });
    }

    public getListFields(listName: string): Promise<IFieldInfo[]> {
        return new Promise<IFieldInfo[]>((resolve, reject) => {
            this._sp.web.lists.getByTitle(listName)
            .fields
            .filter("(Hidden eq false) and (ReadOnlyField eq false) and (InternalName ne 'ContentType') and (InternalName ne 'Attachments')")
            .select("Title", "InternalName")()
            .then((fields: IFieldInfo[]) => {
                resolve(fields);
            }).catch((error: Error) => {
                reject(error);
            });
        });
    }

    public getListItems(listName: string): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this._sp.web.lists.getByTitle(listName).items.top(50)().then((data) => {
                resolve(data);
            }).catch((error: Error) => {
                reject(error);
            })
        });
    }
}