import { useEffect } from "react"
import { Container } from "@material-ui/core"
import Memories from "../memories/Memories"
import { useDispatch } from "react-redux"
import { displayMemories } from "../../action/memories"
import Navbar from "../navbar/Navbar"
import { HomeStyles } from "./styles"

const Home = ({setUser,currentId,setCurrentId}) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(displayMemories())
    }, [currentId,dispatch])

    return (
        <Container>
            <HomeStyles/>
            <Navbar setUser={setUser}/>
            <Memories setCurrentId={setCurrentId} currentId={currentId}/>
        </Container>
    )
}

export default Home
