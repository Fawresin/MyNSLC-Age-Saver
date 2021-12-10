// ==UserScript==
// @name         MyNSLC Age Saver
// @namespace    https://github.com/Fawresin/MyNSLC-Age-Saver
// @version      1.0
// @description  Saves date of birth information to bypass the age verification page on the Cannabis MyNSLC site.
// @author       Fawresin
// @match        https://cannabis.mynslc.com/skins/Cannabis/pages/VerifyAge.aspx
// @grant        none
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    /**
     * The key used for localStorage.
     */
    const STORAGE_ITEM_KEY = 'faw_dob';

    /**
     * How long the script should wait for the UI to update after clicking the
     * verify button..
     */
    const ERROR_VISIBILITY_TIMEOUT = 500;

    /**
     * Throws an error with the message provided.
     * @param {string} msg
     */
    function error(msg) {
        if (typeof msg !== 'string') {
            msg = 'Unknown error.';
        }

        throw new Error(msg);
    }

    /**
     * Returns an element by a query selector or can throw an error if nothing
     * is found.
     * @param {string} selector
     * @param {boolean} [err=true]
     * @returns {Element}
     */
    function $(selector, err) {
        if (err === undefined) {
            err = true;
        }

    	let element = document.querySelector(selector);
    	if (err && element === null) {
            error('Element "' + selector + '" not found.');
    	}

    	return element;
    }

    /**
     * Event handler for when the verify age button is clicked.
     */
    function onBtnVerifyAgeClick() {
        setTimeout(onErrorVisibilityTimeout, ERROR_VISIBILITY_TIMEOUT);
    }

    /**
     * Event handler for the error visibility timeout.
     */
    function onErrorVisibilityTimeout() {
        if (!$('.error-message.u-hide', false)) {
            // Error message is visible.
            return;
        }

       let dobDay = $('#dobDay').value;
       let dobMonth = $('#dobMonth').value;
       let dobYear = $('#dobYear').value;
       localStorage.setItem(STORAGE_ITEM_KEY, `${dobDay}-${dobMonth}-${dobYear}`);
    }

    /**
     * Main procedure.
     */
    function main() {
        let dob = localStorage.getItem(STORAGE_ITEM_KEY);
        if (typeof dob === 'string') {
            // Item exists.
            let dobSplit = dob.split('-');
            if (dobSplit.length !== 3) {
                error('Invalid date format.');
            }

            $('#dobDay').value = dobSplit[0];
            $('#dobMonth').value = dobSplit[1];
            $('#dobYear').value = dobSplit[1];
            $('#btnVerifyAge').click();
        }
        else {
            // Item doesn't exist.
            $('#btnVerifyAge').addEventListener('click', onBtnVerifyAgeClick);
        }
    }

    main();
})();
