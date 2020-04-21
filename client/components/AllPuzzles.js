import React from "react"
import {connect} from "react-redux"
import {fetchAllPuzzles} from "../store/puzzles"


export class AllPuzzles extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.fetchAllPuzzles()

  }
  render(){
    allPuzzles= this.props.puzzle
    return(
      <div>
        {
          allPuzzles && allPuzzles.map(puzzle=>{
            <div key={puzzle.id}>
            <SinglePuzzle puzzle={puzzle}/>
            </div>
          })

        }
      </div>
    )
  }
}

const mapState =(state) => {
  return {
    puzzles:state.puzzles.puzzles
  }
}

const mapDispatch =(dispatch) =>{
  return {
    fetchAllPuzzles:()=> dispatch (fetchAllPuzzles())
  }
}

export default connect(mapState, mapDispatch)(AllPuzzles)
