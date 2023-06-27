import { WebPartContext } from "@microsoft/sp-webpart-base";
import { createContext } from "react";

export const GlobalSPContext = createContext<WebPartContext>(null);