function [notes, note_timestamps] = generate_labeled(file_location)
    % Convert midi file into a vector of notes.

    offset = 20; % Ken Schutte's note number offset.
    thresh = 0.1; % Notes in the same chord shouldn't be apart by > 100ms.
    note_lo = 28; % C3.
    note_hi = 61; % A5.
    note_len = note_hi - note_lo + 1;

    printf('generating labeled data from %s\n', file_location);

    midi = readmidi(file_location);
    midi_info = midiInfo(midi, 0);

    note_nums = midi_info(:, 3) - offset;
    note_start_times = midi_info(:, 5);

    notes = [];
    note_timestamps = [];

    note = zeros(1, note_len); % Temp variable.

    % Base case.
    note(note_nums(1) - note_lo + 1) = 1;
    prev_start_time = note_start_times(1);
    chord_start_time = prev_start_time;

    for i = 2:length(note_nums)
        note_num = note_nums(i);
        note_start_time = note_start_times(i);
        delta_t = note_start_time - prev_start_time;

        if delta_t > thresh
            % Separate note, therefore add the previous note to notes.
            notes = vertcat(notes, note);
            note_timestamps = vertcat(note_timestamps, chord_start_time);

            % And start a new note.
            note = zeros(1, note_len);
            note(note_num - note_lo + 1) = 1;
            chord_start_time = note_start_time;
        else
            % Part of the same chord, add it to the note vector.
            note(note_num - note_lo + 1) = 1;
        end

        prev_start_time = note_start_time;
    end

    % Add the last note to notes.
    notes = vertcat(notes, note);
    note_timestamps = vertcat(note_timestamps, chord_start_time);

    % Debug.
    % disp(midi_info(1:5, :));
    % disp(notes(1:5));
    % disp(note_timestamps(1:5));
end