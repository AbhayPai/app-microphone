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
            this.speechRecongnition.onresult =
                this.speechRecongnition.onresult.bind(this);
            this.speechRecongnition.onaudiostart =
                this.speechRecongnition.onaudiostart.bind(this);
            this.speechRecongnition.onaudioend =
                this.speechRecongnition.onaudioend.bind(this);
        } catch(e) {
            // Do Nothing.
        }
    }

    /*
     *  @componentDidMount()
     *  React Lifecyle Function
     */
    componentDidMount() {
        if (this.speechRecongnition) {
            this.speechRecongnition.continuous = true;
        }
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
        if (this.speechRecongnition) {
            var noteContent = '';
            this.speechRecongnition.start();

            // eslint-disable-next-line
            console.log('this.speechRecongnition', this.speechRecongnition);

            this.speechRecongnition.onresult = (event) => {
                // eslint-disable-next-line
                console.log('onresult', event);
                var current = event.resultIndex;
                var transcript = event.results[current][0].transcript;
                var mobileRepeatBug = (current == 1 &&
                    transcript == event.results[0][0].transcript);

                if(!mobileRepeatBug) {
                    noteContent += transcript;
                }

                this.setState({
                    text: noteContent
                });
            };
        }
    }

    stopRecord() {
        if (this.speechRecongnition) {
            this.speechRecongnition.stop();
        }
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
