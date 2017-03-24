function output_location = predict_notes(Theta1, Theta2, file_location)
    addpath('vendor/jsonlab');

    % [freq_vecs, freq_vec_timestamps] = generate_unlabeled(file_location);

    disp('predicting notes...');

    % p = predict(Theta1, Theta2, freq_vecs);
    output_location = 'C:/Users/Tyron/Documents/GitHub/personal/noteworthy/src/octave/output.json';

    % savejson('', { p, freq_vec_timestamps }, 'FileName', 'output.json');
end