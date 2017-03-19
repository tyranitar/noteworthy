function [notes, note_timestamps] = generate_labeled(file_location)
    % Convert midi file into a vector of notes.
    offset = 20; % Ken Schutte's note number offset.

    printf('generating labeled data from %s\n', file_location);

    midi = readmidi(file_location);
    midi_info = midiInfo(midi, 0);

    notes = midi_info(:, 3) - offset;
    note_timestamps = midi_info(:, 5);

    % Debug.
    % disp(midi_info(1:5, :));
    % disp(notes(1:5));
    % disp(note_timestamps(1:5));
end