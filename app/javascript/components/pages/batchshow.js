import React from "react"
import {
    Card,
    CardTitle,
    CardSubtitle,
    CardBody,
    CardText,
    Container,
    Navbar,
    NavbarText,
    Col,
    Row,
    Button
} from 'reactstrap'
import { Link } from "react-router-dom";
import { getBatches, deleteBatch, updateBatch } from '../apiCalls.js';

import Pickle from 'images/pickle.png'
import Beer from 'images/beer-bottle.png'

class BatchShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            batch: [],
            success: false
        }
    }
    componentDidMount = () => {
        this.getBatchItem()
    }


    getBatchItem = (batch) => {
        this.setState({batch: batch})
    }

    getBatchList = (batches) => {
        getBatches()
    }

    deletedBatch = (batch) => {
        console.log("delete");
        deleteBatch(batch)
        .then((response) => {
            this.getBatchList()
        })
        this.setState({success: true})
        .catch(error => console.log(error))
    }

    render () {
        const id  = this.props.match.params.id
        const batch = this.props.batches.find((batch) => batch.id == parseInt(id))

        const fermentIcons = {
          pickle: Pickle,
          beer: Beer
        }


    return(
        <div>
            <Row>
                <Col sm ="6">
                    <Card className="card text-info bg-info mb-3">
                        <CardBody>
                          <Row>
                              <Col sm= "8">
                                <CardTitle className="card-title text-white"><h2>{batch.name}</h2></CardTitle>
                                <CardSubtitle className="card-title text-white">
                                    <h5>born: {new Date(batch.start_date).toDateString()}</h5>
                                </CardSubtitle>
                              </Col>
                              <Col sm="2" >
                                <img src={fermentIcons[batch.ferment]} height='100px' />
                              </Col>
                          </Row>
                            <CardText style={{color: "white"}}><h5>
                              {batch.description}</h5>
                            </CardText>
                            <Row>
                              <Col>
                                <Link to="/newbatch"  style={{ textDecoration: 'none' }}>
                                  <Button type="button" className="btn btn-warning btn-lg" onClick={() => {this.deletedBatch(batch)}}>delete me</Button>
                                </Link>
                              </Col>
                            </Row>
                        </CardBody>
                    </Card>


                </Col>
                <Col sm="6">
                    <Card className="card text-secondary bg-secondary mb-3">
                        <CardBody>
                            <CardTitle className="card-title text-white"><h2>Tasks</h2></CardTitle>
                                <ul className="list-group list-group-flush">
                                    {batch.tasks.map((task,index)=> {
                                        return(
                                            <li key={index} className="list-group-item">
                                                <h5> Due: {new Date(task.due).toDateString()}</h5>
                                                <h5> {task.title}</h5>
                                                <h6> {task.description}</h6>
                                            </li>
                                        )
                                    })}
                                </ul>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>




    )}
}

export default BatchShow;

//adding notes soon
// <ul className="list-group list-group-flush">
//     {batch.notes.map((note,index)=> {
//         return(
//
//             <li key={index} className="list-group-item">
//                 <h4>{note.date}: {note.note}</h4>
//             </li>
//         )
//     })}
// </ul>

//button to update batch
// <Link to="/newbatch"  style={{ textDecoration: 'none' }}>
//   <Button type="button" className="btn btn-secondary btn-lg btn-center" onClick={() => {this.updateBatch(batch)}}>Edit</Button>
// </Link>
