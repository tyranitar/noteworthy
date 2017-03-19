function [f, freq_vec] = fourier_transform(note, fs)
    num_freqs = 2000;

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
end