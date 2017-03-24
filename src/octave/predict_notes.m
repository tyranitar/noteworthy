function output_location = predict_notes(Theta1, Theta2, file_location)
    [freq_vecs, freq_vec_timestamps] = generate_unlabeled(file_location);

    disp('predicting notes...');

    p = predict(Theta1, Theta2, freq_vecs);
    savejson('', { p, freq_vec_timestamps }, 'FileName', 'output.json');

    % TODO: Change this.
    output_location = 'C:/Users/Tyron/Documents/GitHub/personal/noteworthy/src/octave/output.json';
end