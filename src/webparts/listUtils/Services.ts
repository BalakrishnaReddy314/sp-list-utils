import { getSP } from "./pnpJsConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp";
import "@pnp/sp/lists";
import { IListInfo } from "@pnp/sp/lists";


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
}