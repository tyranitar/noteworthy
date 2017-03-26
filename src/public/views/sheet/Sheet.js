import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import styles from './styles';
import sharedStyles from '../../styles/index';
import IconButton from 'material-ui/IconButton';
import Download from 'material-ui/svg-icons/file/file-download';
import pdf from 'html-pdf';
import path from 'path';
import SnackBar from 'material-ui/SnackBar';

const config = {
  format: "Letter",
  orientation: "portrait",
  quality: "75",
  phantomPath: "./node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs",
  phantomArgs: [],
  script: './node_modules/html-pdf/lib/scripts/pdf_a4_portrait.js'
}

import fs from 'fs';
import dict from './dict';

const waitForFinalEvent = (()=>{
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

function add(a, b) {
	return a + b;
}

function sortNumbers(a, b) {
    return a - b;
}

export default class Sheet extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	snackBarMessage: '',
	    	snackBarOpen: false
	    }

	    this.plotSheet = this.plotSheet.bind(this);
	    this.getDataAndPlot = this.getDataAndPlot.bind(this);
		this.download = this.download.bind(this);
	}

	componentDidMount() {
		this.getDataAndPlot();
    }

    download() {
    	const html = document.getElementById("cardContainer").innerHTML
    	const filePath = './temp/sheet.pdf';
    	
		pdf.create(html, config).toFile(filePath, function(err, res){
			if (err) {
				this.setState({snackBarOpen: true, snackBarMessage: err.message || 'Oops something went wrong!'}})
			} else {
				this.setState({snackBarOpen: true, 'Your sheet has been saved!'}})	
			}
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

	    d3.selectAll("#sheet svg").remove();
	    var divWidth = parseInt(window.getComputedStyle(document.getElementById("sheet"), null).width);
	    this.plotSheet(noteResult, timeResult, divWidth);
	}

	plotSheet(chordArray, timeArray, divWidth) {
	    let xPosition = 25
	    const distanceBetweenNotes = 50;
	    const staffMiddle = 50;
		const spacing = 10;
	    const shift = 12;
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
		for (let i=0, len=length-1; i < len; i++) {
			timeArray[i] = timeArray[i+1] - timeArray[i];
		}
		timeArray[length-1] = 1;

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

				let shifted = false;
	            //Iterate through each note in chord
	            for (let i=0, len = noteValues.length, dx = 0; i < len; i++) {
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
	                }
	            }

				//flag
				if (time < 3.8) {
					let upperNote = noteValues[noteValues.length-1]*5;
	                let lowerNote = noteValues[0]*5+skewY10Adjustment*6;
	                let avg = noteValues.reduce(add, 0) <= 0;
	                staff.append("line")
	                    .attr("x1", shifted||avg ? xPosition+6 : xPosition-6)
	                    .attr("y1", avg ? staffMiddle - upperNote - 25 : staffMiddle - upperNote + skewY10Adjustment*6)
	                    .attr("x2", shifted||avg ? xPosition+6 : xPosition-6)
	                    .attr("y2", avg ? staffMiddle - lowerNote - skewY10Adjustment*6 : staffMiddle - lowerNote + 25)
	                    .style("stroke", "#000")
	                    .style("stroke-width", "0.5");
				}

				//additional lines
				for (let linePos = staffMiddle-3*spacing, i = noteValues[noteValues.length-1]-6; i >= 0; i -= 2, linePos -= spacing) {
					staff.append("line")
	                    .attr("x1", xPosition-10)
	                    .attr("y1", linePos)
	                    .attr("x2", shifted ? xPosition+shift+10 : xPosition+10)
	                    .attr("y2", linePos)
	                    .style("stroke", "#000")
	                    .style("stroke-width", "0.5");
				}
				for (let linePos = staffMiddle+3*spacing, i = noteValues[0]+6; i <= 0; i += 2, linePos += spacing) {
	                staff.append("line")
	                    .attr("x1", xPosition-10)
	                    .attr("y1", linePos)
	                    .attr("x2", shifted ? xPosition+shift+10 : xPosition+10)
	                    .attr("y2", linePos)
	                    .style("stroke", "#000")
	                    .style("stroke-width", "0.5");
	            }

	            xPosition += (time >= 0.5)? time*distanceBetweenNotes : shifted ? 25 : 16;
	            index++;
	        }

	        //Draw staff
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", staffMiddle-2*spacing)
	            .attr("x2", "100%")
	            .attr("y2", staffMiddle-2*spacing)
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", staffMiddle-spacing)
	            .attr("x2", "100%")
	            .attr("y2", staffMiddle-spacing)
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", staffMiddle)
	            .attr("x2", "100%")
	            .attr("y2", staffMiddle)
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", staffMiddle+spacing)
	            .attr("x2", "100%")
	            .attr("y2", staffMiddle+spacing)
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");
	        staff.append("line")
	            .attr("x1", "0")
	            .attr("y1", staffMiddle+2*spacing)
	            .attr("x2", "100%")
	            .attr("y2", staffMiddle+2*spacing)
	            .style("stroke", "#000")
	            .style("stroke-width", "0.5");

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

				<Snackbar open={this.state.snackBarOpen} message={this.state.snackBarMessage} autoHideDuration={2000} onRequestClose={()=> {this.setState({snackBarOpen: false})}}/>
			</div>
		)
	}
}
