import React from 'react';

const waitForFinalEvent = (function() {
    let timers = {};
    return function (callback, ms, uniqueId) {
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

function mapNoteValues(note) {
    const octave = note.match(/[+-]?[0-9]+/);
    const letter = note.match(/[a-g]/);
    // -97 for ASCII conversion, -28 to octave #4 and -6 to shift to B4 = -126, -133 for right-hand staff
    return (!!octave && !!letter) && parseInt(octave[0])*7 + letter[0].charCodeAt(0) - 126;
}

function sortNumbers(a, b) {
    return a - b;
}

export default class Sheet extends React.Component {
	constructor() {
	    super();

	    this.plotSheet = this.plotSheet.bind(this);
	    this.getDataAndPlot = this.getDataAndPlot.bind(this);
	}

	componentDidMount() {
        window.addEventListener("resize", ()=> {
        	waitForFinalEvent(this.getDataAndPlot(), 200, "");
        });
    }

	getDataAndPlot() {
	    d3.selectAll("#sheet svg").remove();
	    var notes = document.getElementById('note-input').value;
	    var noteResult = notes.split(/,| /).filter(function(n){ return n != ''; });
	    var times = document.getElementById('time-input').value;
	    var timeResult = times.split(/,| /).filter(function(n){ return n != ''; });
	    console.log(noteResult, timeResult);
	    //Convoluted way of finding the width of the div, because .width doesn't work. $("#sheet").width() is equivalent
	    //below code may not work inside separate file
	    var divWidth = parseInt(window.getComputedStyle(document.getElementById("sheet"), null).width);
	    this.plotSheet(noteResult, timeResult, divWidth);
	}

	plotSheet(chordArray, timeArray, divWidth) {
	    let xPosition = 25 
	    const distanceBetweenNotes = 50;
	    const staffMiddle = 50;
	    const shift = 11;
	    //var divWidth = window.getComputedStyle(document.getElementById("sheet"), null).width;
	    //Adjustment for skew
	    const skewX15Adjustment = Math.tan(Math.PI/12);
	    const skewY10Adjustment = Math.tan(Math.PI/18);
	    const skewY30Adjustment = Math.tan(Math.PI/6);

	    //Check if arrays
	    if (!(chordArray instanceof Array && timeArray instanceof Array)) {
	        console.error("Inputs are not arrays.");
	        return;
	    }
	    //Starting chord
	    let index = 0;

	    //Check if arrays match
	    const length = chordArray.length < timeArray.length ? chordArray.length : timeArray.length;

	    timeArray = timeArray.map(parseFloat);

	    do {
	        const staff = d3.select("#sheet")
	            .append("svg")
	            .attr("width", "100%");

	        //Reset position
	        xPosition = 25;

	        while (index < length && xPosition + timeArray[index] < divWidth) {
	            //Splits up chord into notes and computes value
	            const noteValues = chordArray[index].toLowerCase()
	            	.split(/(?=[a-z])/)
	                .map(mapNoteValues)
	                .sort(sortNumbers);

	            const time = timeArray[index];


	            //Iterate through each note in chord
	            for (let i=0, len = noteValues.length, dx = 0, shifted = false; i < len; i++) {
	                const yPosition = staffMiddle - noteValues[i]*5;

	                if (i > 0 && noteValues[i-1] + 1 == noteValues[i]) {
	                    //shift note right if adjacent to another, shift back if 2nd adjcent note
	                    if (dx == shift)
	                        dx = 0;
	                    else {
	                        dx = shift;
	                        shifted = true;
	                    }
	                }

	                //whole notes
	                if (time >= 3.8) {
	                    staff.append("ellipse")
	                        .attr("cx", xPosition + dx)
	                        .attr("cy", yPosition)
	                        .attr("rx", "8")
	                        .attr("ry", "5")
	                        .style("fill", "#000");
	                    staff.append("ellipse")
	                        .attr("cx", xPosition + dx - yPosition*skewX15Adjustment)
	                        .attr("cy", yPosition)
	                        .attr("rx", "4")
	                        .attr("ry", "4")
	                        .attr("transform", "skewX(15)")
	                        .style("fill", "#fff");
	                }
	                else {
	                    //black note
	                    staff.append("ellipse")
	                        .attr("cx", xPosition + dx)
	                        .attr("cy", yPosition + (xPosition + dx)*skewY10Adjustment)
	                        .attr("rx", "6")
	                        .attr("ry", "5")
	                        .attr("transform", "skewY(-10)")
	                        .style("fill", "#000");

	                    if (time >= 1.8) {
	                        //half note
	                        staff.append("ellipse")
	                            .attr("cx", xPosition + dx)
	                            .attr("cy", yPosition + (xPosition + dx)*skewY30Adjustment)
	                            .attr("rx", "4.8")
	                            .attr("ry", "2.5")
	                            .attr("transform", "skewY(-30)")
	                            .style("fill", "#fff");
	                    }


	                    //If note is outside of staff, add lines - scratch that, always add lines
	                }
	            }

	            xPosition += (time >= 0.5)? time*distanceBetweenNotes : shifted ? 25 : 16;
	            index++;
	        }

	        //Draw staff
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", "30")
	            .attr("x2", "100%")
	            .attr("y2", "30")
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", "40")
	            .attr("x2", "100%")
	            .attr("y2", "40")
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", "50")
	            .attr("x2", "100%")
	            .attr("y2", "50")
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", "60")
	            .attr("x2", "100%")
	            .attr("y2", "60")
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", "70")
	            .attr("x2", "100%")
	            .attr("y2", "70")
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");

	    } while (index < length);
	}

	render() {
		return (
			<div>
				<span>Notes:</span>
				<input id="note-input" type="text" name="NoteInput" /><br/>
				<span>Times:</span>
				<input id="time-input" type="text" name="TimeInput" /><br/>
				<button type="button" value="Generate Sheet" onClick={this.getDataAndPlot} />
				<div id="sheet"></div>
			</div>
		)
	}
}