disp('generating examples...');

% Wipe labeled and unlabeled folders.

% Iterate through the wav folder and find corresponding midi files.
% If there isn't a corresponding midi file with the same name, throw an error.

% For each wav file, call generate_input to get unlabeled data.
% Store the unlabeled FFT vectors in the unlabeled folder (n x 2).

% Store the labeled note vectors in the labeled folder (n x 2).
% Labeled data should ideally have range of timestamps for flexibility.