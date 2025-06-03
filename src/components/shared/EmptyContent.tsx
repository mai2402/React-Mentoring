import { EmptyContentProps } from "../../interfaces/interfaces";




export default function EmptyContent({children}: EmptyContentProps) {


    return(
        <main className="session-detail">
            {children}
        </main>
    )
}