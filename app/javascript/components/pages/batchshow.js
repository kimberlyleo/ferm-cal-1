import React from "react"
import {
    Card,
    CardTitle,
    CardSubtitle,
    CardBody,
    Col,
    Row,
    Button
} from 'reactstrap'
import { Link } from "react-router-dom";
import { getBatches, deleteBatch, markBatchDone, markTaskDone } from '../apiCalls.js';
import Checkmark from 'images/check-mark.png'
import 'images/minorstyling/checkmark.css'
import Pickle from 'images/pickle.svg'
import Beer from 'images/beer-bottle.svg'

class BatchShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            batch: {
                tasks: []
            },
            success: false
        }
    }

    componentDidMount = () => {
        let theBatch = this.props.batches.find(b => b.id === +this.props.match.params.id)
        this.getBatchItem(theBatch)
    }


    getBatchItem = (batch) => {
        this.setState({batch: batch})
    }

    getBatchList = () => {
        getBatches()
    }

    deletedBatch = (batch) => {
        deleteBatch(batch)
        .then((response) => {
            this.getBatchList()
        })
        this.setState({success: true})
        .catch(error => console.log(error))
    }

    markBatchCompleted = () => {
        let { batch } = this.state
        markBatchDone(batch)
        batch.tasks.forEach( t => t.completed = true )
        this.props.completeBatch(batch)
    }

    markTaskCompleted = (e) => {
        let task = this.state.batch.tasks.find(v => v.id === +e.target.id)
        markTaskDone(task)
        this.props.completeTask(task)
    }

    render () {
        const { batch } = this.state

        const fermentIcons = {
          pickle: Pickle,
          beer: Beer
        }
        const img = {marginBottom: 10}

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
                                <img src={fermentIcons[batch.ferment]} height='100px' style={img}/>
                              </Col>
                          </Row>
                            <ul className="list-group list-group-flush" style={{marginBottom: '1%'}}>
                            <li className="list-group-item">
                                <Row>
                                    <Col sm={8}>
                                        <h6>{batch.description}</h6>
                                    </Col>
                                    <Col sm={4}>
                                    {   batch.completed
                                        ? <h6>Completed!</h6>
                                        : <img id={batch.id}
                                        className='checkmark'
                                        align="right"
                                        src={Checkmark}
                                        onClick={this.markBatchCompleted}
                                        />}
                                    </Col>
                                </Row>

                            </li></ul>
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
                                                <Row>
                                                    <Col sm={8}>
                                                        <h5>Due: {new Date(task.due).toDateString()}</h5>
                                                        <h5>{task.title}</h5>
                                                    </Col>
                                                    <Col sm={4}>
                                                        {task.completed
                                                            ? <h6>Completed!</h6>
                                                            : <img id={task.id}
                                                                className='checkmark'
                                                                align="right"
                                                                src={Checkmark}
                                                                onClick={this.markTaskCompleted}
                                                            />}
                                                    </Col>
                                                </Row>
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
