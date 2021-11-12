import React from "react";
import * as ReactDom from "react-dom";

const Root = ({name} : {name : string}) => {
    return <div>{name}</div>;
}

export const render = ({name} : {name : string}) => ReactDom.render(
    <Root name={name}/>,
    document.getElementById("root")
);