function [X, y] = get_shuffled_examples()
    more off;

    disp('getting shuffled examples...');

    generate_examples();

    % Directories.
    data_dir = '../../data/';
    labeled_dir = strcat(data_dir, 'labeled/');
    unlabeled_dir = strcat(data_dir, 'unlabeled/');

    [unlabeled_files, err, msg] = readdir(unlabeled_dir);

    if err
        error(msg);
    end

    if ~length(unlabeled_files)
        error('there are no examples');
    end

    X_ordered = [];
    y_ordered = [];

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

        X_ordered = [X_ordered; freq_vecs];
        y_ordered = [y_ordered; note_vecs];

        printf('finished loading %s\n', unlabeled_path);
    end

    X = [];
    y = [];

    rand_indices = randperm(size(X_ordered, 1));

    for rand_i = rand_indices
        X = [X; X_ordered(rand_i, :)];
        y = [y; y_ordered(rand_i, :)];
    end

    disp('finished getting shuffled examples');
end