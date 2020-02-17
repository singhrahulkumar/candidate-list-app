import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import CandidateList from './candidate/candidateList'

export default class CandidateRoute extends React.Component {
constructor(props){
    super(props);
    this.state={

    }
}

    render(){
        return (
            <Router>
                <Switch>
                <Route exact path ={'/'}>
                <CandidateList/>
                </Route>
                <Route path ={'/:status'}>
                <CandidateList/>
                </Route>
                </Switch>
            </Router>
        )
    }
}