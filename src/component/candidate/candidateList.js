import React from 'react';
import {withRouter} from 'react-router-dom';
import './candidateList.css';
import candidateDetails from '../candidateList.json';

class CandidateList extends React.Component {
constructor(props){
    super(props);
    this.state = {
     filtered: '1',
     filterOption:{1:"All",2:'Approved',3:'Rejected',4:'Waiting'},
     totalCandidate:[],
     candidateDetails:[]
    }
}

componentDidMount(){
    this.setState({
        totalCandidate:candidateDetails
    },()=> {
    const { status } = this.props.match.params;
    this.setState({
        filtered:status
    })
    this.setStatusCandidate(status === undefined ? '1' : status);
    })
}

setStatusCandidate = status => {
    let candidateDetails = [];
if(status === '1'){
    candidateDetails = [...this.state.totalCandidate];

}else{
 candidateDetails = this.state.totalCandidate.filter(candidate => candidate.status === this.state.filterOption[status]);
}
candidateDetails.sort((first,second)=>{
    let firstAppliedDAte = this.dateFormat(first.appliedDate);
    let secondAppliedDAte = this.dateFormat(second.appliedDate);
    return secondAppliedDAte - firstAppliedDAte;
})
this.setState({
    candidateDetails
})
}

dateFormat = appliedDate => {
    let dateFormat  = appliedDate.split('/');
    let temp = dateFormat[0];
    dateFormat[0] = dateFormat[1];
    dateFormat[1] = temp;
    appliedDate = dateFormat.join('/');
    return new Date(appliedDate);
}
setFilter = () => {
    const options = [];
  for(let status in this.state.filterOption){
      options.push(<option key = {status} value ={status}>{this.state.filterOption[status]}</option>)
  }

    return options;
}

onFilterClick = (e) => {
    let selectedItem = e.target.value;
    this.setState({
        filtered:e.target.value,
    })
    this.setStatusCandidate(e.target.value);
    this.props.history.push(`/${e.target.value}`);
}

render(){
    return (
        <div className = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-xs-12'>
             <div>  
                   <div className={'tab-pane'}>
                    <select value = {this.state.filtered} onChange={this.onFilterClick}>
                        {this.setFilter()}
                    </select>
                </div>
                { this.state.candidateDetails.length > 0 ?
                 <table className={'table table-striped'}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Experience</th>
                        <th>Position Applied</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.candidateDetails.map((candidate,i) =>
                     <tr key={i}>
                     <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.age}</td>
                      <td>{candidate.experience}</td>
                      <td>{candidate.position}</td>
                      <td>{candidate.appliedDate}</td>
                      <td>{candidate.status}</td>
                      </tr>
                      )}
            </tbody>
            </table>
            :<div>No Records For The Selected Status</div>
            }
                </div>
        </div>
    )
}
}

export default withRouter(CandidateList);