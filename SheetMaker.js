function plotSheet(chordArray, timeArray)
{
	var position = 25, staffTop = 30;
	//Adjustment for skewX(15deg)
	var skewX15Adjustment = Math.tan(Math.PI/12);
	var skewY10Adjustment = Math.tan(Math.PI/18);

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
				var staff = d3.select("body")
					.append("svg")
					.attr("width", "100%");
				
				//Reset position
				position = 25;
				
				while (index < length)
				{
					//Splits up chord into notes
					var notes = chordArray[index].toLowerCase().split(/(?=[a-z])/);
					//Calculate time
					var time = parseFloat(timeArray[index]);
					
					//whole notes
					//if (time >= 3.8 || time <= 4.2)
					
					//Iterate through each note in chord
					for (var i=0, len = notes.length; i < len; i++)
					{
						var octave = notes[i].match(/[+-]?[0-9]+/);
						var letter = notes[i].match(/[a-g]/);
						//Checks if not null 
						if (octave !== null && letter !== null)
						{
							// -97 for ASCII conversion, -35 and -5 to shift to F5 = -137 ... might consider moving to B5 (middle note in staff)
							var noteValue = parseInt(octave[0])*7 + letter[0].charCodeAt(0) - 137;
							
							var yPosition = staffTop - noteValue*5;
							
							staff.append("ellipse")
								.attr("cx", position)
								.attr("cy", yPosition)
								.attr("rx", "8")
								.attr("ry", "5")
								.style("fill", "#000");
							staff.append("ellipse")
								.attr("cx", position - yPosition*skewX15Adjustment)
								.attr("cy", yPosition)
								.attr("rx", "4")
								.attr("ry", "4")
								.attr("transform", "skewX(15)")
								.style("fill", "#fff");
							
							//If note is outside of staff, add lines - scratch that, always add lines
						}
						else { console.log("Error: chordArray[" + index + "]->notes[" + i + "] = " + notes[i]); }
					}
					/*else
					{
						black note
						staff.append("ellipse")
							.attr("cx", position)
							.attr("cy", staffTop + skewY10Adjustment*position)
							.attr("rx", "6")
							.attr("ry", "5")
							.attr("transform", "skewY(-10)")
							.style("fill", "#000");
					}*/
					
					position += time*50;
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
			} while (position < -1);
		}
		else { console.log("Input arrays of different lengths."); }
	}
	else { console.log("Inputs are not arrays."); }
}