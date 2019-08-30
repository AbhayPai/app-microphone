/*
 *  All Usable Libraries in this File
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/*
 *  Extending React Component
 */
class Microphone extends React.Component {
    constructor(props) {
        super(props);
        var speechRecongnition = null;
        this.speechRecongnition = null;
        this.stopRecord = this.stopRecord.bind(this);
        this.startRecord = this.startRecord.bind(this);

        this.state = {
            text: 'Speak something after clicking on Start Recording, I Will update here'
        };

        try {
            speechRecongnition = window.SpeechRecognition ||
                window.webkitSpeechRecognition;
            this.speechRecongnition = new speechRecongnition();
        } catch(e) {
            // Do Nothing.
        }
    }

    componentDidMount() {
        this.speechRecongnition.onresult = function(event) {
            var current = event.resultIndex;
            this.setState({
                text: event.results[current][0].transcript
            });
        };
    }

    /*
     *  @render()
     *  React Lifecyle Function
     */
    render () {
        /*
         *  @name is getting value from props or
         *  it will have default value
         */
        let name = this.props.name || 'World';

        /*
         *  @JSX Syntax to display
         */
        return (
            <Fragment>
                <p>
                    <a onClick={this.startRecord}>
                        Start Recording
                    </a>
                </p>
                <p>
                    <a onClick={this.stopRecord}>
                        Stop Recording
                    </a>
                </p>
                <h1>Hello, {name}!!!</h1>
                <p>{this.state.text}</p>
            </Fragment>
        );
    }

    startRecord() {
        this.speechRecongnition.start();
    }

    stopRecord() {
        this.speechRecongnition.stop();
    }
}

/*
 *  defining Proptype for the Microphone Class
 */
Microphone.propTypes = {
    name: PropTypes.string
};

/*
 *  @Microphone
 *  Only class to export from this file
 */
export default Microphone;
