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
    chunks = chunk_notes(y);    % A 2D array of [[start end], ... ] indeces

    start_note = 1; % Which note you want to analyze
    end_note = 3;   % Which note you want to stop the analysis at (inclusive)

    first_start = chunks(start_note, 1);    % Set start index
    third_end = chunks(end_note, 2);    % Set end index

    t_three_note = t(first_start:third_end);    % Get time vector of the notes to be analyzed
    y_three_note = y(first_start:third_end);    % Get data vector of the notes to be analyzed

    plot(t_three_note, y_three_note);   % Plot notes to be analyzed

    % Insert FFT logic here

end