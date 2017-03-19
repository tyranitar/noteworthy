function verified = verify_timestamps(freq_vec_timestamps, note_timestamps)
    % Make sure the timestamps are not off by too much.
    thresh = 0.1; % Shouldn't be off by more than a 100ms.

    verified = false;

    % Already a no-no.
    if length(freq_vec_timestamps) ~= length(note_timestamps)
        return;
    end

    first_timestamp = freq_vec_timestamps(1);

    % Since they won't do it for me.
    note_timestamps = note_timestamps + first_timestamp;

    max_diff = max(abs(freq_vec_timestamps - note_timestamps));

    % Also bad.
    if max_diff > thresh
        return;
    end

    verified = true;
end