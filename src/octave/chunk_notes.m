function chunks = chunk_notes(y) 
	abs_y = abs(y); % This is to ensure that the mean will not be affected by negative vaules
	filtered_y = [];
	chunks = []

	% Chunking notes (using 500 samples per average)
	filtered_y(1) = mean(abs_y(1:500));
	peak = filtered_y(1);
	chunked_row = 1;

	for i = 2 : (length(abs_y) - 500)
		filtered_y(i) = filtered_y(i - 1) - abs_y(i)/500 + abs_y(i + 500)/500;

		if peak < (filtered_y(i) * 0.1)	% If peak is 10% of the current value, then it is a max
			peak = filtered_y(i);		% Set peak to max value and set start index to i
			chunks(chunked_row, 1) = i;
			chunks(chunked_row + 1, 1) = 0;	% Set next start for next row to 0

		elseif ((peak * 0.1) > filtered_y(i))	% If 10% of peak is greater than current value, then it is a min
			peak = filtered_y(i);	% Set peak to min

			if chunks(chunked_row, 1) != 0	% If start of note is defined, then set the min
				chunks(chunked_row, 2) = i;
				chunked_row = chunked_row + 1;	% Increment chunked_row, start of another note.
			else
				chunks(chunked_row - 1, 2) = i;	% Start of current note is undefined, so set min for prev note
			end
		else
			% Do nothing
		end
	endfor

	disp(chunks);

end