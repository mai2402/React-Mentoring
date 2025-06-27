import { type  ReactNode } from "react"





export interface RequireAdminProps {

    children: ReactNode;
}

export default function RequireAdmin({children}: RequireAdminProps){


    return (
        <div>{children}</div>
    )
}