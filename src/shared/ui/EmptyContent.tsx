import { EmptyContentProps } from "../interface/emptyContent";





export default function EmptyContent({children}: EmptyContentProps) {


    return(
        <main className="session-detail">
            {children}
        </main>
    )
}