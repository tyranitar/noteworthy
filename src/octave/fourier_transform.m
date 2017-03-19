function [f, freq_vec] = fourier_transform(note, fs)
    % TODO: Allow frequency resolution to be specified.
    % Then round accordingly in the bucket logic.
    freq_lo = 1;
    freq_hi = 1000;

    note_len = length(note);

    % Actual Fourier Transform logic.
    f = fs * (0:(note_len / 2)) / note_len;
    freq_vec = abs(fft(note) / note_len);
    freq_vec = freq_vec(1:note_len / 2 + 1);
    freq_vec(2:end - 1) = 2 * freq_vec(2:end - 1);

    % Normalizing frequency vectors.
    freq_buckets = freq_lo:1:freq_hi; % Resolution is 1.
    freq_vec_norm = zeros(freq_hi - freq_lo + 1, 1);

    for i = 1:length(f)
        freq = round(f(i));
        freq_mag = freq_vec(i);

        if freq < freq_lo
            continue;
        end

        if freq > freq_hi
            % Exceeded max frequency.
            break;
        end

        % Only keep the highest magnitude in each bucket.
        if freq_mag > freq_vec_norm(freq - freq_lo + 1)
            freq_vec_norm(freq - freq_lo + 1) = freq_mag;
        end
    end

    freq_vec = freq_vec_norm;
    f = freq_buckets;
end