function unlabeled = generate_unlabeled(file_location)
    printf('generating unlabeled data from %s\n', file_location);

    unlabeled = [];

    % Chunk notes then FFT, keeping track of the timestamps for each note/chord.
    % Simply return the generated input vector, don't save anything.
    [y, fs] = audioread(file_location);
end