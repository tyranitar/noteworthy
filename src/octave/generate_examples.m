function generate_examples(wipe = false)
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
            [file_dir, name, ext] = fileparts(file_path);

            if strcmp(ext, '.')
                continue;
            end

            unlink(file_path);
        end
    end

    if wipe
        % Wipe existing preprocessed data.
        wipe_dir(labeled_dir);
        wipe_dir(unlabeled_dir);
    end

    [wav_files, err, msg] = readdir(wav_dir);

    if err
        error(msg);
    end

    % Iterate through the wav folder and find corresponding midi files.
    % If there isn't a corresponding midi file with the same name, skip the iteration.
    for i = 1:length(wav_files)
        wav_file = wav_files{i};
        [dir, name, ext] = fileparts(wav_file);

        if ~strcmp(ext, '.wav')
            continue;
        end

        wav_file_path = strcat(wav_dir, wav_file);
        midi_file_path = strcat(midi_dir, name, '.mid');
        unlabeled_path = strcat(unlabeled_dir, name, '.mat');
        labeled_path = strcat(labeled_dir, name, '.mat');

        if exist(unlabeled_path, 'file') && exist(labeled_path, 'file')
            printf('the following file has already been processed: %s\n', wav_file_path);
            continue;
        end

        if ~exist(midi_file_path, 'file')
            printf('failed to locate a corresponding midi file for %s\n', wav_file_path);
            continue;
        end

        try
            [freq_vecs, freq_vec_timestamps] = generate_unlabeled(wav_file_path);
            [notes, note_timestamps] = generate_labeled(midi_file_path);

            verified = verify_timestamps(freq_vec_timestamps, note_timestamps);

            if verified
                dlmwrite(unlabeled_path, freq_vecs);
                dlmwrite(labeled_path, notes);
            else
                printf('failed to verify timestamps for %s\n', wav_file_path);
            end
        catch err
            printf('an error occurred while processing %s\n', wav_file_path);
        end
    end
end