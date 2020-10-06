function [note_vecs, note_vec_timestamps] = generate_labeled(file_location)
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
    note_timestamps = midi_info(:, 5);

    note_vecs = [];
    note_vec_timestamps = [];

    note_vec = zeros(1, note_len); % Temp variable.

    % Base case.
    note_vec(note_nums(1) - note_lo + 1) = 1;
    prev_timestamp = note_timestamps(1);
    note_vec_timestamp = prev_timestamp;

    for i = 2:length(note_nums)
        note_num = note_nums(i);
        note_timestamp = note_timestamps(i);
        delta_t = note_timestamp - prev_timestamp;

        if delta_t > thresh
            % Separate note, therefore add the previous note vector to the result.
            note_vecs = vertcat(note_vecs, note_vec);
            note_vec_timestamps = vertcat(note_vec_timestamps, note_vec_timestamp);

            % And start a new note vector.
            note_vec = zeros(1, note_len);
            note_vec(note_num - note_lo + 1) = 1;
            note_vec_timestamp = note_timestamp;
        else
            % Part of the same chord, add it to the note vector.
            note_vec(note_num - note_lo + 1) = 1;
        end

        prev_timestamp = note_timestamp;
    end

    % Add the last note vector to the result.
    note_vecs = vertcat(note_vecs, note_vec);
    note_vec_timestamps = vertcat(note_vec_timestamps, note_vec_timestamp);

    % Debug.
    % disp(midi_info(1:5, :));
    % disp(note_vecs(1:5, :));
    % disp(note_vec_timestamps(1:5));
end