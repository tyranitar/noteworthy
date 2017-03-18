function unlabeled = generate_unlabeled(file_location)
    printf('generating unlabeled data from %s\n', file_location);

    unlabeled = [];

    % Chunk notes then FFT, keeping track of the timestamps for each note/chord.
    % Simply return the generated input vector, don't save anything.
    [y, fs] = audioread(file_location);
    delta_t = 1 / fs;
    t = (0:delta_t:((length(y) - 1) * delta_t))';

    % Debug.
    t = t(1:160000);
    y = y(1:160000);

    [start_indices, finish_indices] = chunk_notes(y);
end