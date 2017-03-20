function train_algorithm()
    more off;

    addpath('vendor/neural_net');
    disp('training algorithm...');

    generate_examples();

    % Directories.
    data_dir = '../../data/';
    labeled_dir = strcat(data_dir, 'labeled/');
    unlabeled_dir = strcat(data_dir, 'unlabeled/');
    weights_path = strcat(data_dir, 'weights/index.mat');

    [unlabeled_files, err, msg] = readdir(unlabeled_dir);

    if err
        error(msg);
    end

    if ~length(unlabeled_files)
        error('there is no data to train the algorithm');
    end

    if exist(weights_path, 'file')
        unlink(weights_path); % Delete existing weights.
    end

    % Initialize weights here.

    % Use unlabeled and labeled folders to generate weights.
    % Store weights in the weights folder.
    rand_file_indices = randperm(length(unlabeled_files));

    for file_i = rand_file_indices
        unlabeled_file = unlabeled_files{file_i};
        [unused, name, ext] = fileparts(unlabeled_file);

        if ~strcmp(ext, '.mat')
            continue;
        end

        % The unlabeled file and the labeled file share the same name.
        unlabeled_path = strcat(unlabeled_dir, unlabeled_file);
        labeled_path = strcat(labeled_dir, unlabeled_file);

        if ~exist(labeled_path, 'file')
            printf('failed to locate a corresponding labeled file for %s\n', unlabeled_path);
            continue;
        end

        freq_vecs = load(unlabeled_path);
        note_vecs = load(labeled_path);

        rand_freq_indices = randperm(size(freq_vecs, 1));

        for freq_i = rand_freq_indices
            freq_vec = freq_vecs(freq_i, :); % Input.
            note_vec = note_vecs(freq_i, :); % Expected output.
        end
    end

    disp('finished training algorithm');
end