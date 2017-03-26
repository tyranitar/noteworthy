function output_location = predict_notes(Theta1, Theta2, file_location)
    output_filename = 'output.json';
    [freq_vecs, freq_vec_timestamps] = generate_unlabeled(file_location);

    disp('predicting notes...');

    p = predict(Theta1, Theta2, freq_vecs);
    savejson('', { p, freq_vec_timestamps }, 'FileName', output_filename);

    output_location = strcat(pwd, '\', output_filename);
end