import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import styles from './styles';
import sharedStyles from '../../styles/index';
import IconButton from 'material-ui/IconButton';
import Download from 'material-ui/svg-icons/file/file-download';
import jspdf from 'jspdf';

import fs from 'fs';
import dict from './dict';

let chordArray, timeArray;

const doc = new jspdf();

const waitForFinalEvent = (()=>{
    let timers = {};
    return function (callback, ms, uniqueId) {
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

class Chord {
	constructor(duration, noteValues, willShift) {
		this.duration = duration;
		this.noteValues = noteValues;
		this.willShift = willShift;
	}
	prevNoteAdjacent() {
		return this.noteValues[i-1] + 1 == this.noteValues[i];
	}
	highestNote() {
		return this.noteValues[this.noteValues.length-1];
	}
	lowestNote() {
		return this.noteValues[0];
	}
}

function mapNoteValues(note) {
    const octave = note.match(/[+-]?[0-9]+/);
    const letter = note.match(/[a-g]/);
    // -97 for ASCII conversion, -28 to octave #4 and -6 to shift to B4 = -126, -133 for right-hand staff
    return (octave && letter) && parseInt(octave[0])*7 + letter[0].charCodeAt(0) - 126;
}

function add(a, b) {
	return a + b;
}

function sortNumbers(a, b) {
    return a - b;
}

export default class Sheet extends React.Component {
	constructor() {
	    super();

	    this.plotSheet = this.plotSheet.bind(this);
	    this.getDataAndPlot = this.getDataAndPlot.bind(this);
		this.download = this.download.bind(this);
	}

	componentDidMount() {
		this.getDataAndPlot();

        window.addEventListener("resize", ()=> {
        	waitForFinalEvent(this.rePlot(), 200, "");
        });
    }

    download() {
    	doc.addHTML(document.getElementById('cardContainer'), 0, 0, () => {
        	doc.save('samplers-file.pdf');
        });
    }

	getDataAndPlot() {
		const arr = JSON.parse(fs.readFileSync(this.props.location.query.url, 'utf8'));

		const noteResult = arr[0].map((notes) => {
			let chord = '';

			notes.forEach((note, i) => {
				if (note === 1) {
					chord += dict[i];
				}
			});

			return chord;
		});

		const timeResult = arr[1].map((timestamps) => {
			return timestamps[0];
		});

		chordArray = noteResult;
		timeArray = timeResult;

	    d3.selectAll("#sheet svg").remove();
	    this.plotSheet(chordArray, timeArray);
	}

	rePlot() {
	    d3.selectAll("#sheet svg").remove();
	    this.plotSheet(chordArray, timeArray);
	}

	plotSheet(chordArray, timeArray) {
		var divWidth = parseInt(window.getComputedStyle(document.getElementById("sheet"), null).width);

	    //Check if arrays
	    if (!(chordArray instanceof Array && timeArray instanceof Array)) {
	        console.error("Inputs are not arrays.");
	        return;
	    }
		const numberOfStaffLines = 5;
	    const startingPosition = 25;
	    const distanceBetweenNotes = 50;
	    const minimumDistanceBetweenNotes = 20;
	    const verticalLineSpacing = 10;
	    const verticalNoteSpacing = verticalLineSpacing/2;
	    const noteSizeScale = 1;
	    const flagTailLength = 25;
		//Adjustment for skew
	    const skewX15Adjustment = Math.tan(Math.PI/12);
	    const skewY10Adjustment = Math.tan(Math.PI/18);
	    const skewY30Adjustment = Math.tan(Math.PI/6);
	    //used frequently in determining note sizes, shift, and length of additional lines
	    const shift = 11*noteSizeScale;
	    const scale10 = 10*noteSizeScale;
	    const scale8 = 8*noteSizeScale;
	    const scale6 = 6*noteSizeScale;
	    const scale5 = 5*noteSizeScale;
	    const scale4_8 = 4.8*noteSizeScale;
	    const scale4 = 4*noteSizeScale;
	    const scale2_5 = 2.5*noteSizeScale;
	    //last note in staff can be as close as 25+11 px from right end
	    const distanceAvailable = divWidth - startingPosition - shift;

	    //Starting chord
	    let index = 0;
		//Use smaller array length
	    const length = chordArray.length < timeArray.length ? chordArray.length : timeArray.length;

	    let duration = timeArray.map(parseFloat);
	    duration[length] = duration[length-1] + 1;

	    //Parse chordArray and save data into Chord structure
	    let chords = [];
	    for (let i = 0; i < length; i++) {
	        duration[i] = duration[i+1] - duration[i];
	        //Splits up chord into notes and computes value
	        let noteValues = chordArray[i]
	            .toLowerCase()
	            .split(/(?=[a-z])/)
	            .map(mapNoteValues)
	            .sort(sortNumbers);

	        chords[i] = new Chord(
	            duration[i],
	            noteValues,
	            function() {
	                for (let i = 1, len = noteValues.length; i < len; i++) {
	                    if (noteValues[i-1] + 1 == noteValues[i]) {
	                        return true;
	                    }
	                }
	                return false;
	            }
	        );
	    }

	    do {
	        const staff = d3.select("#sheet")
	            .append("svg")
	            .attr("width", "100%");

			let lookahead = index;
	        let highestNoteOfStaff = 0;
	        for (let distance = startingPosition; lookahead < length && distance < distanceAvailable; lookahead++) {
	            let time = chords[lookahead].duration;
	            distance += (time > 0.5 ? time*distanceBetweenNotes : minimumDistanceBetweenNotes + (chords[lookahead].willShift ? shift : 0));

	            let highestNoteLookahead = chords[lookahead].highestNote();
	            if (highestNoteOfStaff < highestNoteLookahead) {
	                highestNoteOfStaff = highestNoteLookahead;
	            }
	        }

	        let staffMiddleByNote = highestNoteOfStaff*verticalNoteSpacing+verticalLineSpacing;
	        let staffMiddleByLines = numberOfStaffLines*verticalNoteSpacing+verticalNoteSpacing;
	        let staffMiddle = (staffMiddleByNote > staffMiddleByLines ? staffMiddleByNote : staffMiddleByLines);

	        //Reset position
	        let xPosition = startingPosition;

			while (index < lookahead) {
	            let chord = chords[index], noteValues = chord.noteValues;

	            let time = duration[index];

	            let shifted = false;
	            //Iterate through each note in chord
	            for (let i = 0, len = noteValues.length, dx = 0; i < len; i++) {
	                let yPosition = staffMiddle - noteValues[i]*verticalNoteSpacing;

	                if (i > 0 && chord.prevNoteAdjacent(i)) {
	                    //shift note right if adjacent to another, shift back if 2nd adjcent note
	                    if (dx)//if dx has value (!=0)
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
	                        .attr("rx", scale8)
	                        .attr("ry", scale5)
	                        .style("fill", "#000");
	                    staff.append("ellipse")
	                        .attr("cx", xPosition + dx - yPosition*skewX15Adjustment)
	                        .attr("cy", yPosition)
	                        .attr("rx", scale4)
	                        .attr("ry", scale4)
	                        .attr("transform", "skewX(15)")
	                        .style("fill", "#fff");
	                }
	                else {
	                    //black (quarter) note
	                    staff.append("ellipse")
	                        .attr("cx", xPosition + dx)
	                        .attr("cy", yPosition + (xPosition + dx)*skewY10Adjustment)
	                        .attr("rx", scale6)
	                        .attr("ry", scale5)
	                        .attr("transform", "skewY(-10)")
	                        .style("fill", "#000");

	                    if (time >= 1.8) {
	                        //half note
	                        staff.append("ellipse")
	                            .attr("cx", xPosition + dx)
	                            .attr("cy", yPosition + (xPosition + dx)*skewY30Adjustment)
	                            .attr("rx", scale4_8)
	                            .attr("ry", scale2_5)
	                            .attr("transform", "skewY(-30)")
	                            .style("fill", "#fff");
	                    }
	                }
	            }
	            //flag
	            if (time < 3.8) {
	                let flagVerticalShift = skewY10Adjustment*scale6;
	                let upperNote = chord.highestNote()*verticalNoteSpacing;
	                let lowerNote = chord.lowestNote()*verticalNoteSpacing;// + flagVerticalShift;
	                //draw flag pointing up or down
	                let pointUp = noteValues.reduce(add, 0) <= 0;
	                staff.append("line")
	                    .attr("x1", xPosition + (shifted||pointUp ? shift/2 : -shift/2))
	                    .attr("y1", staffMiddle - upperNote - (pointUp ? flagTailLength : (shifted ? flagVerticalShift : -flagVerticalShift)))
	                    .attr("x2", xPosition + (shifted||pointUp ? shift/2 : -shift/2))
	                    .attr("y2", staffMiddle - lowerNote + (pointUp ? -flagVerticalShift : flagTailLength))
	                    .style("stroke", "#000")
	                    .style("stroke-width", "0.5");
	            }

	            //additional lines
	            for (let linePos = staffMiddle - (numberOfStaffLines+1)/2*verticalLineSpacing, i = chord.highestNote() - (numberOfStaffLines+1); i >= 0; i -= 2, linePos -= verticalLineSpacing) {
	                staff.append("line")
	                    .attr("x1", xPosition-scale10)
	                    .attr("y1", linePos)
	                    .attr("x2", xPosition+scale10 + (shifted ? shift : 0))
	                    .attr("y2", linePos)
	                    .style("stroke", "#000")
	                    .style("stroke-width", "0.5");
	            }
	            for (let linePos = staffMiddle + (numberOfStaffLines+1)/2*verticalLineSpacing, i = chord.lowestNote() + (numberOfStaffLines+1); i <= 0; i += 2, linePos += verticalLineSpacing) {
	                staff.append("line")
	                    .attr("x1", xPosition-scale10)
	                    .attr("y1", linePos)
	                    .attr("x2", xPosition+scale10 + (shifted ? shift : 0))
	                    .attr("y2", linePos)
	                    .style("stroke", "#000")
	                    .style("stroke-width", "0.5");
	            }

	            xPosition += (time >= 0.5 ? time*distanceBetweenNotes : minimumDistanceBetweenNotes + (shifted ? shift : 0));
	            index++;
	        }

			//Draw staff
	        let position = (numberOfStaffLines*verticalLineSpacing-verticalLineSpacing)/2;
	        while (position > 0) {
	            staff.append("line")
	                .attr("x1", "0")
	                .attr("y1", staffMiddle-position)
	                .attr("x2", "100%")
	                .attr("y2", staffMiddle-position)
	                .style("stroke", "#000")
	                .style("stroke-width", "0.5");
	            staff.append("line")
	                .attr("x1", "0")
	                .attr("y1", staffMiddle+position)
	                .attr("x2", "100%")
	                .attr("y2", staffMiddle+position)
	                .style("stroke", "#000")
	                .style("stroke-width", "0.5");

	            position -= verticalLineSpacing;
	        }
	        if (position == 0) {
	            staff.append("line")
	                .attr("x1", "0")
	                .attr("y1", staffMiddle)
	                .attr("x2", "100%")
	                .attr("y2", staffMiddle)
	                .style("stroke", "#000")
	                .style("stroke-width", "0.5");
	        }
	    } while (index < length);
	}

	render() {
		return (
			<div style = { styles.sheetContainer } >
				<div id = "cardContainer" style = {styles.cardContainer}>
					<Card style = { styles.cardStyle }>
					    <CardTitle title="Scoresheet" titleStyle={ styles.cardTitle }>
					    </CardTitle>
						<div id="sheet" style = {{textAlign: 'center', marginLeft: '25px', marginRight: '25px'}}></div>
					</Card>
				</div>
			</div>
		)
	}
}
