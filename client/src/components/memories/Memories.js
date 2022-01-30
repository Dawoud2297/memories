import { Grid, CircularProgress } from "@material-ui/core"
import Memory from "./memory/Memory"
import { useSelector } from 'react-redux'



const Memories = ({setCurrentId, currentId}) => {
    const memories = useSelector(state=>state.memories)

    return (
        !memories.length ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    memories.map(memo=>(
                        <>
                        <Grid key={memo._id} item xs={12} sm={6} md={6}>
                            <Memory memory={memo} setCurrentId={setCurrentId} currentId={currentId}/>
                        </Grid>
                        </>
                    ))
                }
            </Grid>
        )
    )
}
export default Memories
