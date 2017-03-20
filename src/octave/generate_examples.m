function generate_examples(wipe = false)
    more off;

    addpath('vendor/midi');
    disp('generating examples...');

    % Directories.
    data_dir = '../../data/';
    wav_dir = strcat(data_dir, 'wav/');
    midi_dir = strcat(data_dir, 'midi/');
    unlabeled_dir = strcat(data_dir, 'unlabeled/');
    labeled_dir = strcat(data_dir, 'labeled/');
    timestamps_dir = strcat(data_dir, 'timestamps/');

    if wipe
        % Wipe existing preprocessed data.
        wipe_dir(unlabeled_dir);
        wipe_dir(labeled_dir);
        wipe_dir(timestamps_dir);
    end

    [wav_files, err, msg] = readdir(wav_dir);

    if err
        error(msg);
    end

    % Iterate through the wav folder and find corresponding midi files.
    % If there isn't a corresponding midi file with the same name, skip the iteration.
    for i = 1:length(wav_files)
        wav_file = wav_files{i};
        [unused, name, ext] = fileparts(wav_file);

        if ~strcmp(ext, '.wav')
            continue;
        end

        wav_file_path = strcat(wav_dir, wav_file);
        midi_file_path = strcat(midi_dir, name, '.mid');
        unlabeled_path = strcat(unlabeled_dir, name, '.mat');
        labeled_path = strcat(labeled_dir, name, '.mat');
        timestamps_path = strcat(timestamps_dir, name, '.mat');

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
            [note_vecs, note_vec_timestamps] = generate_labeled(midi_file_path);

            verified = verify_timestamps(freq_vec_timestamps, note_vec_timestamps);

            if verified
                dlmwrite(unlabeled_path, freq_vecs);
                dlmwrite(labeled_path, note_vecs);
                dlmwrite(timestamps_path, note_vec_timestamps);
            else
                printf('failed to verify timestamps for %s\n', wav_file_path);
            end
        catch err
            printf('an error occurred while processing %s\n', wav_file_path);
        end
    end

    disp('finished generating examples');
end