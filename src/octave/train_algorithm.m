function train_algorithm()
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

    % Use unlabeled and labeled folders to generate weights.
    % Store weights in the weights folder.
    for i = 1:length(unlabeled_files)
        unlabeled_file = unlabeled_files{i};
        [dir, name, ext] = fileparts(unlabeled_file);

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
        notes = load(labeled_path);
    end
end