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
        this.downloadRecordDoc = this.downloadRecordDoc.bind(this);
        this.downloadRecordText = this.downloadRecordText.bind(this);

        this.state = {
            audio: 'Microphone is Off',
            sound: 'Sound recording is not started',
            speech: 'Speech recording is not started',
            text: `Speak something after clicking on Start Recording,
                I will record your speech here`,
        };

        try {
            speechRecongnition = window.SpeechRecognition ||
                window.webkitSpeechRecognition;
            this.speechRecongnition = new speechRecongnition();
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
                <div className='row'>
                    <div className='col-12'>
                        <h1>Hello, {name}!!!</h1>
                    </div>
                </div>
                <div className='row'>
                    <a id='download' className='d-none' />
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white' onClick={this.startRecord}>
                            Start Recording
                        </a>
                    </div>
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white' onClick={this.stopRecord}>
                            Stop Recording
                        </a>
                    </div>
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white'>
                            {this.state.audio}
                        </a>
                    </div>
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white'>
                            {this.state.sound}
                        </a>
                    </div>
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white'>
                            {this.state.speech}
                        </a>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white' onClick={this.downloadRecordText}>
                            Download Recorded Speech as Text File
                        </a>
                    </div>
                    <div className='col-3 col-sm-1 col-lg-2'>
                        <a className='btn btn-primary text-white' onClick={this.downloadRecordDoc}>
                            Download Recorded Speech as Microsoft Doc File
                        </a>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <p id='recordedText'>{this.state.text}</p>
                    </div>
                </div>
            </Fragment>
        );
    }

    startRecord() {
        if (this.speechRecongnition) {
            let current = '';
            let transcript = '';
            let noteContent = '';
            let mobileRepeatBug = '';

            this.speechRecongnition.start();

            this.speechRecongnition.onaudiostart = () => {
                this.setState({
                    audio: 'Microphone is On'
                });
            };

            this.speechRecongnition.onaudioend = () => {
                this.setState({
                    audio: 'Microphone is Off'
                });
            };

            this.speechRecongnition.onsoundstart = () => {
                this.setState({
                    sound: 'Sound Started'
                });
            };

            this.speechRecongnition.onsoundend = () => {
                this.setState({
                    sound: 'Sound Ended'
                });
            };

            this.speechRecongnition.onspeechstart = () => {
                this.setState({
                    speech: 'Record is ongoing'
                });
            };

            this.speechRecongnition.onspeechend = () => {
                this.setState({
                    speech: 'Recording is completed'
                });
            };

            this.speechRecongnition.onresult = (event) => {
                current = event.resultIndex;
                transcript = event.results[current][0].transcript;
                mobileRepeatBug = (current == 1 &&
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

    downloadRecordText() {
        if (document.getElementById('recordedText') &&
            document.getElementById('download') &&
            document.getElementById('download').innerText === '') {
            let download = document.getElementById('download');
            let recordToSave = document.getElementById('recordedText').innerText;

            download.setAttribute('download',
                new Date().getDate() + '-' +
                new Date().getMonth() + '-' +
                new Date().getYear() + '-' +
                new Date().getTime() + '-download.txt');
            download.setAttribute('href', 'data:application/txt,' +
                encodeURI(recordToSave));
            download.click();
        }
    }

    downloadRecordDoc() {
        if (document.getElementById('recordedText') &&
            document.getElementById('download') &&
            document.getElementById('download').innerText === '') {
            let download = document.getElementById('download');
            let recordToSave = document.getElementById('recordedText').innerText;
            download.setAttribute('download',
                new Date().getDate() + '-' +
                new Date().getMonth() + '-' +
                new Date().getYear() + '-' +
                new Date().getTime() + '-download.doc');
            download.setAttribute('href', 'data:text/doc;charset=utf-8,' +
                encodeURI(recordToSave));
            download.click();
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
