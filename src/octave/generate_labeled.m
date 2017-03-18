function [notes, note_timestamps] = generate_labeled(file_location)
    % Convert midi file into a vector of notes.

    printf('generating labeled data from %s\n', file_location);

    midi = readmidi(file_location);
    midi_info = midiInfo(midi, 0);

    % TODO: Either readmidi is wrong, or Reaper is wrong.
    notes = midi_info(:, 3);
    note_timestamps = midi_info(:, 5);

    % % Debug.
    % disp(notes);
    % disp(note_timestamps);
end