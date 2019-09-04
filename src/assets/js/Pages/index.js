/*
 *  Require Sass file for the compilation
 */
require('SassPath/pages/index.scss');

/*
 *  All Usable Libraries in this File
 */
import React from 'react';
import ReactDOM from 'react-dom';

/*
 *  All Usable React Reusable Components in this File
 */
import Microphone from 'ComponentsPath/Microphone';

/*
 *  All Usable Modules in this File
 */
import DetectBrowser from 'ModulesPath/DetectBrowser';

class Index {
    /*
     *  @constructor
     *  all definition of variable should be done inside this
     */
    constructor () {
        this.name = 'Transcriber';
    }

    /*
     *  @init
     *  all trigger of main function should be done inside this
     */
    init () {
        this.render();
    }

    /*
     *  @render
     *  all render logic should be done inside this
     */
    render () {
        if (document.getElementById('app')) {
            let detectBrowser = new DetectBrowser().detectBrowser || false;
            if (detectBrowser.isDesktopChrome &&
                !detectBrowser.isIOSChrome &&
                !detectBrowser.isIE &&
                !detectBrowser.isMobile &&
                !detectBrowser.isOpera) {
                ReactDOM.render(
                    <Microphone name={this.name} />,
                    document.getElementById('app')
                );
            } else {
                document.getElementById('app').innerHTML =
                    '<h1 class="display-1 text-danger">' +
                    'Sorry!!! This app is compatible only with dekstop chrome browser.' +
                    '</h1>';
            }
        }
    }
}

new Index().init();
