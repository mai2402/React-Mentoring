import {useState} from "react";
import {CustomTableProps} from "../interface/table";
import Modal from "./Modal";
import DropDownItem from "./DropDownItem";
import { DropDownMenu } from "./DropDownMenu";

export default function Table < T > ({data, columns, actions} : CustomTableProps < T >) {

    const [activeDropdown, setActiveDropdown] = useState < number | null > (null);

    return (

        <table className="session-table">
            {/* Table Head */}
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.label}>{col.label}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
            </thead>

           {/* Table Body */}
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col.label}>
                                {col.render
                                    ? col.render(item)
                                    : (item as any)[col.key]}
                            </td>
                        ))}

                       {/* Table Actions */}
                    {actions && (
                        <td>
                            <DropDownMenu
                                trigger={<span style={{ cursor: "pointer" }}>⋮</span>}
                                align="right"
                                className="session-table__actions"
                            >
                                {(close) =>
                                    actions(item).map((act) => (
                                        <DropDownItem
                                            key={act.label}
                                            onClick={() => {
                                                act.action(); // run your action
                                                close();
                                            }}
                                        >
                                            {act.icon} {act.label}
                                        </DropDownItem>
                                    ))
                                }
                            </DropDownMenu>
                        </td>
                    )}
                    </tr>
                ))}
            </tbody>
        </table>
    )

}