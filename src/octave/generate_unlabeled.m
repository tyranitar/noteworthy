function [freq_vecs, freq_vec_timestamps] = generate_unlabeled(file_location)
    % Chunk notes then FFT, keeping track of the timestamps for each note/chord.
    % Simply return the generated input vector, don't save anything.

    printf('generating unlabeled data from %s\n', file_location);

    num_freqs = 2000;

    freq_vecs = [];
    freq_vec_timestamps = [];

    [y, fs] = audioread(file_location);
    delta_t = 1 / fs;
    len = length(y);
    t = delta_t * (0:(len - 1))';

    % Debug.
    t = t(1:160000);
    y = y(1:160000);

    [start_indices, finish_indices] = chunk_notes(y);
    num_notes = length(start_indices);

    for i = 1:num_notes
        start_index = start_indices(i);
        finish_index = finish_indices(i);
        note = y(start_index:finish_index);
        note_len = length(note);

        % TODO: Inconsistent frequency intervals.
        % Consider putting frequencies into buckets.
        f = fs * (0:(note_len / 2)) / note_len;

        freq_vec = abs(fft(note) / note_len);
        freq_vec = freq_vec(1:note_len / 2 + 1);
        freq_vec(2:end - 1) = 2 * freq_vec(2:end - 1);

        % TODO: Fix this.
        freq_vec = freq_vec(1:num_freqs);
        f = f(1:num_freqs);

        % TODO: Make the timestamps more general (maybe average).
        freq_vecs = vertcat(freq_vecs, freq_vec');
        freq_vec_timestamps = vertcat(freq_vec_timestamps, t(start_index));

        % % Debug.
        % [max_val, max_idx] = max(freq_vec);
        % printf('peak frequency of %d at %dHz\n', max_val, f(max_idx));
        % figure;
        % plot(t(start_index:finish_index), note);
        % figure;
        % plot(f, freq_vec);
    end
end