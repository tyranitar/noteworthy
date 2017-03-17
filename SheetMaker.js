function plotSheet(chordArray, timeArray, divWidth) {
    console.log(~~null);
    var xPosition = 25, staffTop = 30, distanceBetweenNotes = 50;
    //var divWidth = window.getComputedStyle(document.getElementById("sheet"), null).width;
    //Adjustment for skew
    const skewX15Adjustment = Math.tan(Math.PI/12);
    const skewY10Adjustment = Math.tan(Math.PI/18);
    const skewY30Adjustment = Math.tan(Math.PI/6);
    const shift = 11;

    //Check if arrays
    if (!(chordArray instanceof Array && timeArray instanceof Array)) {
        console.error("Inputs are not arrays.");
        return;
    }
    //Starting chord
    var index = 0;

    //Check if arrays match
    var length = chordArray.length < timeArray.length ? chordArray.length : timeArray.length;

    timeArray = timeArray.map(parseFloat);

    do {
        var staff = d3.select("#sheet")
            .append("svg")
            .attr("width", "100%");

        //Reset position
        xPosition = 25;

        while (index < length// && typeof timeArray[index+1] !== 'undefined'
        && xPosition + timeArray[index] < divWidth) {
            //Splits up chord into notes and computes value
            console.log(index);
            console.log(chordArray[index].toLowerCase());

            var noteValues = chordArray[index].toLowerCase()
                .split(/(?=[a-z])/)
                .map(mapNoteValues)
                .sort(sortNumbers);

            // for (var i=0, j=0, len = notes.length; i <len; i++)
            // {
            //     var octave = notes[i].match(/[+-]?[0-9]+/);
            //     var letter = notes[i].match(/[a-g]/);
            //     if (octave !== null && letter !== null)
            //     {
            //         // -97 for ASCII conversion, -35 and -5 to shift to F5 = -137 ... might consider moving to B5 (middle note in staff)
            //         noteValues[j] = parseInt(octave[0])*7 + letter[0].charCodeAt(0) - 137;
            //         j++;
            //     }
            //     else { console.log("Error: chordArray[" + index + "]->notes[" + i + "] = " + notes[i]); }
            // }
            // noteValues.sort(sortNumbers);
            var time = timeArray[index];


            //Iterate through each note in chord
            for (var i=0, len = noteValues.length, dx = 0, shifted = false; i < len; i++) {
                var yPosition = staffTop - noteValues[i]*5;

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

function sortNumbers(a, b) {
    return a - b;
}

function mapNoteValues(note) {
    var octave = note.match(/[+-]?[0-9]+/);
    var letter = note.match(/[a-g]/);
    return (!!octave && !!letter) && parseInt(octave[0])*7 + letter[0].charCodeAt(0) - 137;
}
