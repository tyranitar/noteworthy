function chunks = chunk_notes(y) 
	abs_y = abs(y); % This is to ensure that the mean will not be affected by negative vaules
	filtered_y = [];
	chunks = []

	% Chunking notes (using 500 samples per average)
	num_samples = 500;
	perc_threshold = 0.05; 

	filtered_y(1) = mean(abs_y(1:num_samples));	% Initial mean
	peak = filtered_y(1);	% Set initial peak
	chunked_row = 1;	% Initialize row

	for i = 2 : (length(abs_y) - num_samples)
		% Calculating mean for current data point
		filtered_y(i) = filtered_y(i - 1) - abs_y(i)/num_samples + abs_y(i + num_samples)/num_samples;

		if peak < (filtered_y(i) * perc_threshold)	% If peak is 10% of the current value, then it is a max
			peak = filtered_y(i);		% Set peak to max value and set start index to i
			chunks(chunked_row, 1) = i;
			chunks(chunked_row + 1, 1) = 0;	% Set next start for next row to 0

		elseif ((peak * perc_threshold) > filtered_y(i))	% If 10% of peak is greater than current value, then it is a min
			peak = filtered_y(i);	% Set peak to min

			if chunks(chunked_row, 1) != 0	% If start of note is defined, then set the min
				chunks(chunked_row, 2) = i;
				chunked_row = chunked_row + 1;	% Increment chunked_row, start of another note.
			else
				chunks(chunked_row - 1, 2) = i;	% Start of current note is undefined, so set min for prev note
			end
		end
	endfor

end