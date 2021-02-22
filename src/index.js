import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {
    // constructor alawys has props
    state = {lat: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                // TO UPDATE STATE OBJECT YOU NEED TO USE SETSTATE
                this.setState({lat: position.coords.latitude});
            },
            (err) => {
                this.setState({errorMessage: err.message});
            }
        );
    };

    renderContent () {
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>;
    }
        else if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
    }
            return <Spinner message="Please accept location request" />;
    
    }

    // render is required to be defined by react
    render() {
        return (
            <div>{this.renderContent()}</div>
        );
    }
}


ReactDOM.render(<App />, document.querySelector('#root'));