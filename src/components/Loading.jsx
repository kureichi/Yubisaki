import { OrbitProgress } from 'react-loading-indicators'

function Loading() {
    return(
        <>
            <OrbitProgress style={{ fontSize: "3px" }} size="small" color="white" />
        </>
    )
}

export default Loading