function train_algorithm()
    more off;

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

    disp('training algorithm...');

    if exist(weights_path, 'file')
        unlink(weights_path); % Delete existing weights.
    end

    % Initialize weights here.

    % Use unlabeled and labeled folders to generate weights.
    % Store weights in the weights folder.
    for i = 1:length(unlabeled_files)
        unlabeled_file = unlabeled_files{i};
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

        % Iterate through the input data randomly.
        for i = 1:size(freq_vecs, 1)
            freq_vec = freq_vecs(i, :); % Input.
            note_vec = note_vecs(i, :); % Expected output.
        end
    end
end