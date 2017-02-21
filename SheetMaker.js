function plotSheet(chordArray, timeArray)
{
	var xPosition = 25, staffTop = 30;
	//Adjustment for skewX(15deg)
	var skewX15Adjustment = Math.tan(Math.PI/12);
	var skewY10Adjustment = Math.tan(Math.PI/18);
	var skewY30Adjustment = Math.tan(Math.PI/6);

	//Check if arrays
	if (chordArray instanceof Array && timeArray instanceof Array)
	{
		//Starting chord
		var index = 0;
		
		//Check if arrays match
		var length = chordArray.length;
		if (length == timeArray.length)
		{
			do {
				var staff = d3.select("#sheet")
					.append("svg")
					.attr("width", "100%");
				
				//Reset position
				xPosition = 25;
				
				while (index < length)
				{
					//Splits up chord into notes and computes value
					var notes = chordArray[index].toLowerCase().split(/(?=[a-z])/);
					var noteValues = [];
					for (var i=0, j=0, len = notes.length; i <len; i++)
					{
						var octave = notes[i].match(/[+-]?[0-9]+/);
						var letter = notes[i].match(/[a-g]/);
						if (octave !== null && letter !== null)
						{
							// -97 for ASCII conversion, -35 and -5 to shift to F5 = -137 ... might consider moving to B5 (middle note in staff)
							noteValues[j] = parseInt(octave[0])*7 + letter[0].charCodeAt(0) - 137;
							j++;
						}
						else { console.log("Error: chordArray[" + index + "]->notes[" + i + "] = " + notes[i]); }
					}
					noteValues.sort(sortNumbers);
					//Calculate time
					var time = parseFloat(timeArray[index]);
					
					
					//Iterate through each note in chord
					for (var i=0, len = noteValues.length, dx = 0, shifted = false; i < len; i++)
					{
						var yPosition = staffTop - noteValues[i]*5;
						
						if (i > 0 && noteValues[i-1] + 1 == noteValues[i])
						{
							if (dx == 11)
								dx = 0;
							else
							{
								dx = 11;
								shifted = true;
							}
						}
						
						//whole notes
						if (time >= 3.8)//time <= 4.2
						{
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
						else
						{
							//black note
							staff.append("ellipse")
								.attr("cx", xPosition + dx)
								.attr("cy", yPosition + (xPosition + dx)*skewY10Adjustment)
								.attr("rx", "6")
								.attr("ry", "5")
								.attr("transform", "skewY(-10)")
								.style("fill", "#000");
							
							if (time >= 1.8)
							{
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
					
					xPosition +=  + (time >= 0.5)? time*50 : shifted ? 25 : 16;
					index++;
				}
				
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
			} while (xPosition + parseFloat(timeArray[index+1]) < staff.width);
		}
		else { console.log("Input arrays of different lengths."); }
	}
	else { console.log("Inputs are not arrays."); }
}

function sortNumbers(a, b) {
	return a - b;
}