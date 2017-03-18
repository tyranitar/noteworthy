function unlabeled = generate_unlabeled(file_location)
    printf('generating unlabeled data from %s\n', file_location);

    unlabeled = [];

    % Chunk notes then FFT, keeping track of the timestamps for each note/chord.
    % Simply return the generated input vector, dont save anything.
    [y, fs] = audioread(file_location);

    dt = 1/fs;
    t = linspace(0, length(y)/fs, length(y));
	    % t = time vector
	    % length(y)/fs = ending time
	    % length(y) = lentgh of time vector

    % plot(t, y);
    chunks = chunk_notes(y);
    	% A 2D array of [[start end], ... ] indeces

    % Insert FFT logic here
    

end