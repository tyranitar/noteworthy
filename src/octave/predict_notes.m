function [notes, timestamps] = predict_notes(file_location, weights);
    printf('predicting notes for %s\n', file_location);

    % Call generate_input for the given file location, be it a recording (in the temp folder) or a local file (upload).
    % Use the weights to predict the notes, maybe output as json and return output location.
end