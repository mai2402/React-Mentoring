import {useState} from "react";
import {CustomTableProps} from "../interface/table";
import Modal from "./Modal";
import DropDownItem from "./DropDownItem";

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
                                <div
                                    className="session-table__actions"
                                    onClick={() => setActiveDropdown(activeDropdown === index
                                    ? null
                                    : index)}>
                                    <span
                                        style={{
                                        cursor: "pointer"
                                    }}>⋮</span>

                                    {activeDropdown === index && (
                                        <Modal
                                            isOpen={true}
                                            onClose={() => setActiveDropdown(null)}
                                            modalClassName="modal-backdrop dropdown-backdrop"
                                            containerClassName="modal-container dropdown-menu">

                                           {/* DROPDOWN MENU PART FOR ACTIONS */}
                                            {actions(item).map((act) => (
                                                <DropDownItem key={act.label} onClick={act.action}>
                                                    {act.icon}
                                                    {act.label}
                                                </DropDownItem>
                                            ))}
                                        </Modal>
                                    )}
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )

}