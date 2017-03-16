function labeled = generate_labeled(file_location)
    printf('generating labeled data from %s\n', file_location);

    labeled = [];

    % Convert midi file into a vector of notes.
    midi = readmidi(file_location);
    notes = midiInfo(midi, 0);
end