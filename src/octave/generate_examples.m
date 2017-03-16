function generate_examples()
    addpath('vendor');
    disp('generating examples...');

    % Directories.
    data_dir = '../../data/';
    labeled_dir = strcat(data_dir, 'labeled/');
    midi_dir = strcat(data_dir, 'midi/');
    unlabeled_dir = strcat(data_dir, 'unlabeled/');
    wav_dir = strcat(data_dir, 'wav/');

    function wipe_dir(dir)
        printf('wiping directory: %s\n', dir);

        [files, err, msg] = readdir(dir);

        if err
            error(msg);
        end

        for i = 1:length(files)
            file = files{i};
            file_path = strcat(dir, file);

            unlink(file_path);
        end
    end

    % Wipe existing preprocessed data.
    wipe_dir(labeled_dir);
    wipe_dir(unlabeled_dir);

    % Iterate through the wav folder and find corresponding midi files.
    % If there isn't a corresponding midi file with the same name, throw an error.
    [wav_files, err, msg] = readdir(wav_dir);

    if err
        error(msg);
    end

    for i = 1:length(wav_files)
        wav_file = wav_files{i};
        [dir, name, ext] = fileparts(wav_file);

        if ext == '.wav'
            wav_file_path = strcat(wav_dir, wav_file);
            midi_file_path = strcat(midi_dir, name, '.mid');

            if exist(midi_file_path, 'file')
                % For each wav file, call generate_input to get unlabeled data.
                % Store the unlabeled FFT vectors in the unlabeled folder (n x 2).
                unlabeled = generate_unlabeled(wav_file_path);
                unlabeled_path = strcat(unlabeled_dir, name, '.mat');
                dlmwrite(unlabeled_path, unlabeled);

                % Store the labeled note vectors in the labeled folder (n x 2).
                % Labeled data should ideally have range of timestamps for flexibility.
                labeled = generate_labeled(midi_file_path);
                labeled_path = strcat(labeled_dir, name, '.mat');
                dlmwrite(labeled_path, labeled);
            else
                error('a corresponding midi file must exist for every wav file');
            end
        end
    end
end