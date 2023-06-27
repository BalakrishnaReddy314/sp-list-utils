import * as React from "react";
import { useContext } from "react";
import styles from "./Header.module.scss";
import { GlobalSPContext } from "../../GlobalSPContext";
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';


function Header(): JSX.Element {
  const context = useContext(GlobalSPContext);
  return (
    <nav className={styles.header}>
      <label>SharePoint List Utilities</label>
      <Persona 
        imageUrl={`${context.pageContext.web.absoluteUrl}//_layouts/15/userphoto.aspx?username=${context.pageContext.user.email}`}
        text={context.pageContext.user.displayName.toUpperCase()}
        size={PersonaSize.size32}
        styles={{primaryText: {color: "#fff"}}}
      />
    </nav>
  );
}

export default Header;
