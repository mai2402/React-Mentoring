import { useUploader } from "../hooks/useUploader"




export default function Uploader() {
    const {isLoading, uploadSessions} = useUploader()

    return(
        <div>
            <h1>Upload sessions</h1>
            <button disabled={isLoading} onClick={uploadSessions}>{isLoading? "...uploading" : "uplaod sessions"}</button>
        </div>
    )
}